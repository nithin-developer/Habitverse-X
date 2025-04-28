from flask import Blueprint, render_template
from .auth import auth_required

dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/dashboard')
def dashboard_page():
    return render_template('pages/dashboard.html')