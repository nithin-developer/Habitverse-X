import sys
import os

# Get the project root directory (one level up from 'admin')
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, PROJECT_ROOT)  # ✅ Add project root to Python's path

from flask import Flask, redirect, render_template, get_flashed_messages, session, url_for
from config.database import init_db
from dotenv import load_dotenv
import os
from models import *
from routes import auth, dashboard, habits, timebank

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key_here')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key_here')

init_db(app)

@app.context_processor
def inject_alert():
    alert = get_flashed_messages(with_categories=True)
    status = ''
    if len(alert) > 0:
        status, alert = alert[0]
    if status == 'success':
        status = 'green'
    elif status == 'error':
        status = 'red'
    elif status == 'info':
        status = 'blue'
    elif status == 'warning':
        status = 'yellow'
    return dict(alert=alert, status=status)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('errors/500.html'), 500

@app.route('/')
def index():
    if session.get('user_id'):
        return redirect(url_for('dashboard.dashboard_page'))
    return redirect(url_for('auth.login_get'))

app.register_blueprint(auth.auth)
app.register_blueprint(dashboard.dashboard)
app.register_blueprint(habits.habit)
app.register_blueprint(timebank.timebank)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)