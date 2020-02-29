import os

from flask import Flask, session, flash
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required

app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))


@app.route("/")
@login_required
def index():


    return "Project 1: TODO"


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username").lower()
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        if password != confirmation:
            flash("Passwords do not match")
            return render_template("register.html")
        elif db.execute("SELECT username FROM users WHERE username=:username", username=username):
            flash("Username has already existed!")
            return render_template("register.html")
        hashed_password = generate_password_hash(password)
        db.execute("INSERT INTO users (username, hash) VALUES(?, ?)",
                   username, hashed_password)
        session["user_id"] = db.execute(
            "SELECT id FROM users WHERE username = :username", username=username)

        flash("Registered!")
        return redirect("/")
    else:
        return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    session.clear()
    if request.method == "POST":
        username = request.form.get("username").lower()
        password = request.form.get("password")
        user_data = db.execute(
            "SELECT * FROM users WHERE username = :username", username=username)

        if len(user_data) != 1 or not check_password_hash(user_data[0]["hash"], password):
            flash("Invalid username/password!")
            return render_template("login.html")

        session["user_id"] = user_data[0]["id"]

        return redirect("/")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/change")
@login_required
def change():
    if request.method == "POST":
        user_id = session["user_id"]
        if isinstance(user_id, list):
            user_id = user_id[0]["id"]

        current_password = request.form.get("password")
        new_password = request.form.get("new_password")
        confirmation = request.form.get("confirmation")

        if new_password != confirmation:
            flash("Passwords do not match!")
            return render_template("change.html")
        user = db.execute(
            "SELECT * FROM users WHERR id = :user_id", user_id=user_id)
        if not check_password_hash(user[0][hash], current_password):
            flash("Current password is wrong!")
            return render_template("change.html")
        else:
            hash = generate_password_hash(new_password)
            db.execute("UPDATE users SET hash=:hash WHERE id=:user_id",
                       hash=hash, user_id=user_id)
            flash("Password has been changed!")
            return redirect("/logout")
    else:
        return render_template("change.html")

@app.route("/search")
@login_required
def search():
    if request.methods == "POST":
        search_text = request.form.get("search")
        
