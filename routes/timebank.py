from flask import Blueprint, render_template

timebank = Blueprint('timebank', __name__)

@timebank.route('/timebank')
def timebank_get():
    return render_template('pages/timebank.html')