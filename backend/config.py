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