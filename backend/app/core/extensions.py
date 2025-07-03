from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from marshmallow import Schema
from flask_marshmallow import Marshmallow
 
db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()
ma = Marshmallow() 