from flask import Blueprint, render_template, request, redirect, url_for, flash

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET'])
def login_get():
    return render_template('auth/login.html')

@auth.route('/login', methods=['POST'])
def login_post():
    pass

@auth.route('/register', methods=['GET'])
def register_get():
    return render_template('auth/register.html')

@auth.route('/register', methods=['POST'])
def register_post():
    pass