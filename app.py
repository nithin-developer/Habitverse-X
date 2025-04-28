from flask import Flask, render_template
from routes import auth

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('pages/index.html') 

app.register_blueprint(auth.auth, url_prefix='/auth')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)