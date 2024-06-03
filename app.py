from flask import Flask, render_template, request, flash, redirect, url_for
import random
import string

app = Flask(__name__)
app.secret_key = 'supersecretkey'

def generate_password(length, use_lowercase, use_uppercase, use_digits, use_special):
    char_set = ''
    if use_lowercase:
        char_set += string.ascii_lowercase
    if use_uppercase:
        char_set += string.ascii_uppercase
    if use_digits:
        char_set += string.digits
    if use_special:
        char_set += '!@#'
    
    if not char_set:
        return ''
    
    return ''.join(random.choice(char_set) for _ in range(length))

@app.route('/', methods=['GET', 'POST'])
def index():
    password = ''
    length = 12
    use_lowercase = use_uppercase = use_digits = use_special = True
    
    if request.method == 'POST':
        length = int(request.form['length'])
        use_lowercase = 'lowercase' in request.form
        use_uppercase = 'uppercase' in request.form
        use_digits = 'digits' in request.form
        use_special = 'special' in request.form

        if length < 1:
            flash('Password length must be at least 1.')
        else:
            password = generate_password(length, use_lowercase, use_uppercase, use_digits, use_special)
            if not password:
                flash('You must select at least one character set.')
    
    return render_template('index.html', password=password, length=length,
                           use_lowercase=use_lowercase, use_uppercase=use_uppercase,
                           use_digits=use_digits, use_special=use_special)

if __name__ == '__main__':
    app.run(debug=True)
