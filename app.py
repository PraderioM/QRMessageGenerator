import os

from flask import Flask, render_template, make_response, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/main.js')
def main_js():
    return render_template('main.js')


@app.route('/davidshimjs-qrcodejs/qrcode.js')
def qr_code_js():
    return render_template('davidshimjs-qrcodejs/qrcode.js')


@app.route('/davidshimjs-qrcodejs/jquery.min.js')
def jquery_js():
    return render_template('davidshimjs-qrcodejs/jquery.min.js')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

