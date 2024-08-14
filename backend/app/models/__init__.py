from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db =SQLAlchemy()
bcrypt = Bcrypt()
from .users import User  # noqa: E402, F401
