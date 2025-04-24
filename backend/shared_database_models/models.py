from shared_database_models import db
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy.orm import relationship



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    # Relationships
    rockets = relationship('Rocket', back_populates='owner')
    visualizations = relationship('Visualization', back_populates='creator')


class Rocket(db.Model):
    __tablename__ = 'rockets'

    rocket_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    # Relationships
    owner = relationship('User', back_populates='rockets')
    flights = relationship('Flight', back_populates='rocket')


class Flight(db.Model):
    __tablename__ ='flights'

    flight_id =db.Column(db.Integer, primary_key=True)
    rocket_id = db.Column(db.Integer, db.ForeignKey('rockets.rocket_id'), nullable=False)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    # Relationships
    rocket = relationship('Rocket', back_populates='flights')
    flight_data = relationship('FlightData', back_populates='flight')
    visualization = relationship('Visualization', back_populates='flight')


class FlightData(db.Model):
    __tablename__ = 'flight_data'

    data_id = db.Column(db.Integer, primary_key=True)
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.flight_id'), nullable=False)
    time = db.Column(db.Float,
    
     nullable=False)
    altitude = db.Column(db.Float, nullable=False)
    speed = db.Column(db.Float, nullable=False)
    orientation_x = db.Column(db.Float, nullable=False)
    orientation_y = db.Column(db.Float, nullable=False)
    orientation_z = db.Column(db.Float, nullable=False)

    # Relationships
    flight = relationship('Flight', back_populates='flight_data')


class Visualization(db.Model):
    __tablename__ = 'visualizations'

    visualization_id = db.Column(db.Integer, primary_key=True)
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.flight_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    flight = relationship('Flight', back_populates='visualizations')
    creator = relationship('User', back_populates='visualizations')
