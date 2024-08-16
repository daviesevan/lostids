from flask import Blueprint, current_app, jsonify, request, url_for, redirect
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token
from app.models import db
from app.models.users import User
from sqlalchemy.exc import IntegrityError
from app.emails.send import send_email
from app.emails.user_registration import user_signup_email
from app.emails.email_verification import user_email_verification
from app.emails.reset_email import reset_email_content
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from app import oauth
import os
from urllib.parse import urlencode

authentication_bp = Blueprint("authentication", __name__, url_prefix='/api/auth')

# Google authentication instance 
google = oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    client_kwargs={'scope': 'openid profile email'},
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration'
)

def generate_token(data, salt=None):
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    return serializer.dumps(data, salt=salt)

def confirm_token(token, salt=None, expiration=3600):
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    try:
        data = serializer.loads(token, salt=salt, max_age=expiration)
    except (SignatureExpired, BadSignature):
        return None
    return data

def generate_reset_token(email):
    return generate_token(email, salt=current_app.config['SECURITY_PASSWORD_SALT'])

def confirm_reset_token(token, expiration=3600):
    return confirm_token(token, salt=current_app.config['SECURITY_PASSWORD_SALT'], expiration=expiration)

def generate_email_verification_token(email):
    return generate_token(email, salt=current_app.config['SECURITY_PASSWORD_SALT'])

def confirm_email_verification_token(token, expiration=3600):
    return confirm_token(token, salt=current_app.config['SECURITY_PASSWORD_SALT'], expiration=expiration)


@authentication_bp.post('/signup')
def signup():
    data = request.json
    print(data)
    username = data.get('username')
    fullname = data.get('fullname')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password or not fullname:
        return jsonify({'message': 'Required fields were not filled'}), 400

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        if existing_user.username == username:
            return jsonify({'message': 'Username already exists'}), 409
        else:
            return jsonify({'message': 'Email already exists'}), 409

    try:
        new_user = User(username=username,fullname=fullname, email=email)
        new_user.set_password(password)
        new_user.is_email_verified = False  

        db.session.add(new_user)
        db.session.flush()

        # Generate email verification token
        token = generate_email_verification_token(email)
        url = os.getenv("FRONTEND_URL")
        verification_url = f"{url}/email-verification/{token}"

        # Send verification email
        verification_email_content = user_email_verification(verification_url, new_user.username)
        send_email(new_user.email, "Verify Your Email for SafeReturn", verification_email_content)

        # Send welcome email
        welcome_content = user_signup_email(new_user.username) 
        send_email(new_user.email, "Welcome to SafeReturn: Where 'Gone Forever' Means 'See You Soon'", welcome_content)

        db.session.commit()

        return jsonify({
            'message': 'User created successfully. Please check your email to verify your account.',
        }), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists'}), 409
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

@authentication_bp.post('/signin')
def signin():
    data = request.json

    # Extract and validate the data
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'email and password are required'}), 400

    try:
        # Fetch the user from the database
        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({'message': 'Required fields were not filled'}), 401

        if user.used_google:
            return jsonify({'message': 'Hmm... Use google for your signin'}), 401

        if user.account_locked:
            return jsonify({'message': 'Account is locked. Please contact support.'}), 403

        if not user.check_password(password):
            user.failed_login_attempts += 1

            if user.failed_login_attempts >= 5:
                user.lock_account()
                return jsonify({'message': 'Too many failed attempts. Account locked. Just forget the password!'}), 403

            db.session.commit()
            return jsonify({'message': f'Hmmm... credentials look invalid {user.failed_login_attemps} trials remaining'}), 401

        if not user.is_active:
            return jsonify({'message': 'Account is inactive. Please forget password.'}), 403

        if not user.is_email_verified:
            return jsonify({'message': 'Email is not verified. Please verify your email before signing in.'}), 403

        # Successful login, reset failed attempts and record the login time
        user.failed_login_attempts = 0
        user.record_login()

        # Generate JWT tokens
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'refresh_token': refresh_token,
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

@authentication_bp.post('/verify-email/<token>')
def verify_email(token):
    try:
        email = confirm_email_verification_token(token, expiration=3600)  # 1 hour expiration
        if email is None:
            return jsonify({'message': 'Invalid or expired token'}), 400

        user = User.query.filter_by(email=email).first()
        if user is None:
            return jsonify({'message': 'User not found'}), 404

        if user.is_email_verified:
            return jsonify({'message': 'Email already verified'}), 200

        user.is_email_verified = True
        db.session.commit()

        return jsonify({'message': 'Email verified successfully'}), 200

    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

@authentication_bp.post('/forgot-password')
def forgot_password():
    data = request.json
    email = data.get('email')

    if not email:
        return jsonify({'message': 'Email is required'}), 400

    try:
        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({'message': 'If your email is associated with an account, you will receive a password reset link shortly.'}), 200

        # Generate reset token
        token = generate_reset_token(user.email)
        url = os.getenv("BACKEND_URL")
        reset_url = f"{url}/api/auth/reset-password/{token}"

        # Send reset email
        reset_email = reset_email_content(user.username, reset_url)
        send_email(user.email, "Reset Your SafeReturn Password", reset_email)

        return jsonify({'message': 'If your email is associated with an account, you will receive a password reset link shortly.'}), 200

    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


@authentication_bp.route('/reset-password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    if request.method == 'GET':
        email = confirm_reset_token(token)
        if not email:
            return jsonify({'error': 'Invalid or expired token'}), 400
        return jsonify({'message': 'Token is valid, you can now reset your password'}), 200

    if request.method == 'POST':
        try:
            email = confirm_reset_token(token)
            if not email:
                return jsonify({'error': 'Invalid or expired token'}), 400

            data = request.json
            new_password = data.get('password')
            if not new_password:
                return jsonify({'error': 'Password is required'}), 400

            user = User.query.filter_by(email=email).first()
            if not user:
                return jsonify({'error': 'User not found'}), 404

            user.set_password(new_password)
            db.session.commit()

            return jsonify({'message': 'Password has been reset successfully'}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Error resetting password: {e}'}), 500


@authentication_bp.post('/refresh-token')
@jwt_required(refresh=True)
def refresh_access_token():
    try:
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        return jsonify(access_token=access_token), 200
    except Exception as e:
        return jsonify(error=f'Error refreshing token: {e}'), 401

# Google auth
@authentication_bp.route('/authorize/google')
def google_authorize():
    redirect_uri = url_for('authentication.google_callback', _external=True)
    return google.authorize_redirect(redirect_uri)

@authentication_bp.route('/callback/google')
def google_callback():
    try:
        # Get access token and user info from Google
        token = google.authorize_access_token()  # noqa: F841
        userinfo_endpoint = current_app.config['GOOGLE_USERINFO_ENDPOINT']
        resp = google.get(userinfo_endpoint)
        user_info = resp.json()

        email = user_info['email']
        name = user_info.get('name')
        username = email.split('@')[0]

        user = User.query.filter_by(email=email).first()

        if not user:
            user = User(
                email=email,
                fullname=name,
                username=username,
                is_email_verified=True,
                used_google=True
            )
            db.session.add(user)
            db.session.flush()

            # Send welcome email
            welcome_content = user_signup_email(user.fullname) 
            send_email(user.email, "Welcome to SafeReturn: Where 'Gone Forever' Means 'See You Soon'", welcome_content)

        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        params = urlencode({
            'access_token': access_token,
            'refresh_token': refresh_token,
            'message': f"Hey there {user.fullname}, welcome back!"
        })
        frontend_url = f"{os.getenv('FRONTEND_URL')}/auth/callback?{params}"
        db.session.commit()
        return redirect(frontend_url)
    except Exception as e:
        db.session.rollback()
        print(f"Exception: {e}")
        return jsonify(error='An error occurred during Google authentication'), 500