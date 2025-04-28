from flask import Blueprint, render_template

habit = Blueprint('habit', __name__)

@habit.route('/habits')
def habit_get():
    return render_template('pages/habits.html')