from flask import Flask, render_template, get_flashed_messages
from config.jwt import init_jwt
from config.database import init_db
from routes import auth
from dotenv import load_dotenv
import os
from models import *

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key_here')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key_here')

init_jwt(app)
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

@app.route('/')
def index():
    return render_template('pages/index.html') 

app.register_blueprint(auth.auth, url_prefix='/auth')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)