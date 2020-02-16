import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime

from helpers import login_required, usd, card_check

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///EO1.db")

# Make sure API key is set
if not os.environ.get("API_KEY"):
    raise RuntimeError("API_KEY not set")

# can add here a graph of current donation and number of solutions as function of days
@app.route("/")
def index():
    """Show index or homepage of the website"""

    # query for images
    environment = db.execute("SELECT * FROM galeries WHERE category = :category", category = "Environment")
    animals = db.execute("SELECT * FROM galeries WHERE category = :category", category = "Animals")
    people = db.execute("SELECT * FROM galeries WHERE category = :category", category = "People")
    collection = [environment, animals, people]
    category = ["Environment", "Animals", "People"]
    indexContent = db.execute("SELECT content FROM indexContent")
    content = []
    for cont in indexContent:
        content.append(cont["content"])

    return render_template("index.html", collection=collection, category=category, content=content)


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":

        # get input information from user
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        # check if the password and its confirmation are matched
        if password != confirmation:
            flash("Password does not match!")
            return render_template("register.html")

        # check if the username exists in the database
        elif db.execute("SELECT username FROM users WHERE username = :username", username = username):
            flash("Username has already existed!")
            return render_template("register.html")

        # hash the password and insert the registration to the users database
        hashed_password = generate_password_hash(password)
        db.execute("INSERT INTO users (username, hash) VALUES (:username, :hash)", username = username, hash = hashed_password)
        session["user_id"] = db.execute("SELECT id FROM users WHERE username = :username", username = username)

        # registered and return to the homepage
        flash("Registered!")
        return redirect ("/")
    else:
        return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Query database for username
        username = request.form.get("username").lower()
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                          username=username)

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            flash("invalid username and/or password")
            return render_template("login.html")

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/distribution", methods=["GET", "POST"])
@login_required
def distribution():
    """Distribution from all donated distribution"""
    user_id = session["user_id"]
    distribution = db.execute("SELECT * FROM distribution")
    total = db.execute("SELECT SUM(amount) as total FROM donations")[0]["total"]
    print(user_id)
    for dis in distribution:
        dis["amount"] = usd(dis["amount"])

    if request.method == "POST" and int(user_id) < 0:
        admin = 1
        amount = request.form.get("amount")
        organization = request.form.get("organization")
        note = request.form.get("note")
        new_total = total - int(amount)
        category = request.form.get("category")
        db.execute("INSERT INTO distribution (amount, organization, note) VALUES(?, ?, ?)", int(amount), organization, note)
        db.execute("INSERT INTO donations (user_id, username, amount, category, note) VALUES(-1, 'admin', ?, ?, ?)", -int(amount), category, note)

        return render_template("distribution.html", distribution=distribution, admin=admin, total=new_total)

    elif request.method == "GET" and user_id < 0:
        admin = 1
        return render_template("distribution.html", distribution=distribution, admin=admin, total=total)

    else:
        admin = 0
        return render_template("distribution.html", distribution=distribution, admin=admin, total=total)


@app.route("/all_donations")
def all_donations():
    """Show history of user's donations and solutions"""
    donations = db.execute("SELECT * FROM donations WHERE amount > 0")
    return render_template("all_donations.html", donations=donations)


@app.route("/all_solutions", methods=["GET", "POST"])
def all_solutions():
    """Show history of user's donations and solutions"""
    solutions = db.execute("SELECT * FROM solutions")
    return render_template("all_solutions.html", solutions=solutions)


@app.route("/your_contribution")
@login_required
def your_contribution():
    user_id = session["user_id"]
    donations = db.execute("SELECT * FROM donations WHERE user_id=:user_id AND amount > 0", user_id = user_id)
    solutions = db.execute("SELECT * FROM solutions WHERE user_id=:user_id", user_id = user_id)
    return render_template("your_contribution.html", donations=donations, solutions=solutions)


@app.route("/donate", methods=["GET", "POST"])
@login_required
def donate():
    user_id = session["user_id"]
    if request.method == "POST":
        # check credit card validation
        card = str(request.form.get("card"))
        amount = float(request.form.get("amount"))
        category = request.form.get("category")
        note = request.form.get("note")

        # check the number of card digits and the validation of the card/card prividers
        if card_check(card):
            username = db.execute("SELECT username FROM users WHERE id =:id", id=user_id)
            db.execute("INSERT INTO donations (user_id, username, amount, category, note) VALUES(?, ?, ?, ?, ?)", user_id, username[0]["username"], amount, category, note)
            flash("Thank you very much for your lifesaving work")
        else:
            flash("Invalid credit card!")
        return redirect("/all_donations")
    else:
        return render_template("donate_contribute.html")


@app.route("/contribute", methods=["GET", "POST"])
@login_required
def contribute():
    user_id = session["user_id"]
    if request.method == "POST":
        username = db.execute("SELECT username FROM users WHERE id=:id", id = user_id)
        solution = request.form.get("solution")
        category = request.form.get("category")
        db.execute("INSERT INTO solutions (user_id, username, solution, category) VALUES(?, ?, ?, ?)", user_id, username[0]["username"], solution, category)
        flash("Thank you very much for your lifesaving contribution")
        return redirect("/all_solutions")
    else:
        return render_template("donate_contribute.html")


@app.route("/account", methods=["GET", "POST"])
@login_required
def account():
    """changing password"""
    if request.method == "POST":
        user_id = session["user_id"]

        # get user inputs
        current_password = request.form.get("password")
        new_password = request.form.get("new_password")
        confirmation = request.form.get("confirmation")

        if new_password != confirmation:
            flash("Password does not match")
            return render_template("account.html")

        # query for user information
        user = db.execute("SELECT * FROM users WHERE id = :user_id", user_id = user_id)

        # compare the current password hashes
        if not check_password_hash(user[0]["hash"], current_password):
            flash("Password does not match")
            return render_template("Wrong current password!")
        else:
            # hash the new password and update the database
            hash = generate_password_hash(new_password)
            db.execute("UPDATE users SET hash = :hash WHERE id = :user_id", hash=hash, user_id=user_id)
            flash("Password has been changed!")
            return redirect("/logout")
    else:
        return render_template("account.html")

