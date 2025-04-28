from datetime import datetime
from config.database import db

class TimeBank(db.Model):
    __tablename__ = 'timebank'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    time_saved = db.Column(db.Float, default=0)  # Total minutes saved
    coins_earned = db.Column(db.Float, default=0)  # Total coins earned
    
    # Relationship with User
    user = db.relationship('User', backref=db.backref('timebank', lazy=True))
    
    def __repr__(self):
        return f'<TimeBank {self.id}: User {self.user_id}, Coins: {self.coins_earned}>'

class Redemption(db.Model):
    __tablename__ = 'redemptions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reward_id = db.Column(db.Integer)  # We're not using a foreign key since rewards are hardcoded
    reward_name = db.Column(db.String(100), nullable=False)
    cost = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    # Relationship with User
    user = db.relationship('User', backref=db.backref('redemptions', lazy=True))
    
    def __repr__(self):
        return f'<Redemption {self.id}: User {self.user_id}, Reward: {self.reward_name}, Cost: {self.cost}>' 