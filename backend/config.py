from dotenv import find_dotenv, load_dotenv
from os import getenv
load_dotenv(find_dotenv())

class ApplicationConfiguration:
    SECRET_KEY = getenv('APP_SECRET')
    SQLALCHEMY_DATABASE_URI = "sqlite:///lostids.db"
    SECURITY_PASSWORD_SALT = getenv("SECURITY_PASSWORD_SALT")
    JWT_SECRET_KEY = getenv('APP_SECRET')
    JWT_ACCESS_TOKEN_EXPIRES = 900 #15 minutes
    JWT_REFRESH_TOKEN_EXPIRES = 86400 #1 day
    GOOGLE_CLIENT_ID = getenv('GOOGLE_CLIENT_ID')
    GOOGLE_CLIENT_SECRET = getenv('GOOGLE_SECRET_KEY')
    GOOGLE_REDIRECT_URI = getenv('GOOGLE_REDIRECT_URI')
    GOOGLE_USERINFO_ENDPOINT = 'https://openidconnect.googleapis.com/v1/userinfo'
    SESSION_TYPE = 'filesystem'
    SESSION_FILE_DIR = './sessions/'  
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True 