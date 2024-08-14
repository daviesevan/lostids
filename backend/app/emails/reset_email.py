def reset_email_content(username, reset_url):
    return f"""
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {{
            font-family: 'Inter', sans-serif;
            background-color: #f9fafb;
            color: #1f2937;
            margin: 0;
            padding: 20px;
            line-height: 1.5;
        }}
        .container {{
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #ffffff, #f3f4f6);
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }}
        .header {{
            text-align: center;
            padding-bottom: 24px;
        }}
        .header h1 {{
            margin: 0;
            text-align: left;
            color: #4f46e5;
            font-size: 28px;
            font-weight: 700;
        }}
        .content {{
            font-size: 16px;
        }}
        .button {{
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;
            background-color: #4f46e5;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 24px;
            transition: background-color 0.2s ease;
        }}
        .button:hover {{
            background-color: #4338ca;
        }}
        .note {{
            margin-top: 24px;
            padding: 12px;
            background-color: #e0e7ff;
            color: #4338ca;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
        }}
        .footer {{
            text-align: center;
            padding-top: 24px;
            font-size: 14px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            margin-top: 32px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reset Your Password</h1>
        </div>
        <div class="content">
            <p>Hello {username},</p>
            <p>We received a request to reset the password for your SafeReturn account. To proceed with the password reset, please click the button below:</p>
            <a href="{reset_url}" class="button">Reset Password</a>
            <p class="note">This password reset link will expire in 24 hours. If you don't reset your password within this time, you may need to submit a new request.</p>
            <p>If you didn't request a password reset, please disregard this email. Your account's security is important to us, so if you're concerned about any unauthorized access, please contact our support team immediately.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 SafeReturn. All rights reserved.</p>
            <p>If you need assistance, please contact us at support@safereturn.com</p>
        </div>
    </div>
</body>
</html>
    """