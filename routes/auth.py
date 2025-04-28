from flask import Blueprint, render_template, request, redirect, url_for, flash, get_flashed_messages, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from config.database import db
import uuid
# import func
from functools import wraps

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/login', methods=['GET'])
def login_get():
    if 'user_id' in session:
        return redirect(url_for('dashboard.dashboard_page'))
    return render_template('auth/login.html')

@auth.route('/register', methods=['GET'])
def register_get():
    if 'user_id' in session:
        return redirect(url_for('dashboard.dashboard_page'))
    return render_template('auth/register.html')

@auth.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')

    if not email or not password:
        flash('Please enter email and password', category='error')
        return redirect(url_for('auth.login_get'))

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        flash('Incorrect email or password', category='error')
        return redirect(url_for('auth.login_get'))
    
    session['user_id'] = user.user_id
    session['fullname'] = user.fullname
    session['email'] = user.email

    flash('Login successful', category='success')

    return redirect(url_for('dashboard.dashboard_page'))

@auth.route('/register', methods=['POST'])
def register_post():
    fullname = request.form.get('fullname')
    email = request.form.get('email')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm_password')

    if password != confirm_password:
        flash('Passwords do not match', category='error')
        return redirect(url_for('auth.register_get'))

    if not fullname or not email or not password:
        flash('Please fill in all fields', category='error')
        return redirect(url_for('auth.register_get'))

    user = User.query.filter_by(email=email).first()
    if user:
        flash('Email already exists', category='error')
        return redirect(url_for('auth.register_get'))

    if len(password) < 8:
        flash('Password must be at least 8 characters', category='error')
        return redirect(url_for('auth.register_get'))

    new_user = User(user_id=uuid.uuid4(), fullname=fullname, email=email, password=generate_password_hash(password)) 
    db.session.add(new_user)
    db.session.commit()

    flash('Registration successful, login to continue', category='success')

    return redirect(url_for('auth.login_get'))

@auth.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('fullname', None)
    session.pop('email', None)
    return redirect(url_for('auth.login_get'))

def auth_required(func):
    def wrapper(*args, **kwargs):
        if 'user_id' not in session:
            flash('Login required', category='error')
            return redirect(url_for('auth.login_get'))
        return func(*args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper