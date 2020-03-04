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


@app.route("/", methods=["POST", "GET"])
@login_required
def search():
    if request.methods == "POST":
        if not request.form.get("search"):
            flash("You must provide isbn, title, or author in the search field")
            return render_template("index.html")

        search_text = request.form.get("search")
        in_text = "%" + search_text + "%"
        data = db.execute("SELECT * FROM books WHERE (title LIKE :in_text) OR (author LIKE :in_text) OR (isbn LIKE :in_text)", in_text = in_text)
        if len(data) == 1:
            flash("NOT FOUND IN OUR DATABASE")
            return render_template("search.html", search_text)
        else:
            return render_template("search_results.html", data=data, search_text = search_text)
    else:
        return render_template("index.html")

@app.route("/google_search", methods=["POST"])
@login_required
def google_search():
    search_text = request.form.get("search")
    return redirect("www.google.com/search?q=" + search_text)

@app.route("/gr_search", methods=["POST"])
@login_required
def gr_search():
    search_text = request.form.get("search")
    return redirect("www.goodreads.com/search?q=" + search_text)

@app.route("/book/<str:isbn>", methods=["GET", "POST")
@login_required
def book(isbn):
    user_id = session["user_id"]
    username = db.execute("SELECT username FROM users WHERE user_id = :user_id", user_id = user_id)["username"]
    book = db.execute("SELECT * FROM books WHERE isbn = :isbn", isbn = isbn)
    reviews = db.execute("SELECT * FROM reviews WHERE book_isbn=:isbn SORT BY date", isbn = isbn)
    QAs = db.execute("SELECT * FROM QAs WHERE book_isbn=:isbn SORT BY date", isbn = isbn)
    responses = db.execute("SELECT * FROM responses WHERE book_isbn=:isbn SORT BY date", isbn = isbn)
    user_review = db.execute("SELECT * FROM reviews WHERE book_isbn=:isbn AND username = :username", isbn = isbn, username = username)
    user_QA = db.execute("SELECT * FROM QAs WHERE book_isbn=:isbn AND username = :username", isbn = isbn, username = username)
    user_response = db.execute("SELECT * FROM responses WHERE book_isbn=:isbn AND username = :username", isbn = isbn, username = username)
    if request.method = "GET":
        # query for goodreads book's data
        res_rc = request.get("https://www.goodreads.com/book/review_counts.json", params={"key": apikey, "isbns": isbn})
        book_rc = res.json()["books"][0]
        """JSON will be like:
        {"id":50019613,"isbn":"0441172717","isbn13":"9780441172719","ratings_count":241,
        "reviews_count":614,"text_reviews_count":13,"work_ratings_count":674280,"work_reviews_count":1163860,
        "work_text_reviews_count":18697,"average_rating":"4.22"}
        call book_rc["reviews_count"] or book_rc["average_rating"] or book_rc["work_ratings_count"] for reviews_count, average_rating, or ratings_count
        """


        return render_template("book.html", book, reviews, QAs, responses, user_rating, user_review, user_response, book_rc)

        # check if user responses, review and rating are not NULL either here or in html with jinja2

@app.route("/rating", methods=["POST"])
@login_required
def rating:
    user_id = session["user_id"]
    username = db.execute("SELECT username FROM users WHERE user_id = :user_id", user_id = user_id)["username"]
    isbn = request.form.get("isbn")
    user_rating = request.form.get("rating")
    db.execute("UPDATE reviews SET rating=:rating WHERE username=:username AND isbn=:isbn", rating=user_rating, username=username, isbn=isbn")
    flash("Thank you for your rating!")
    return render_template("book.html")

@app.route("/review", methods=["POST"])
@login_required
def review:
    user_id = session["user_id"]
    username = db.execute("SELECT username FROM users WHERE user_id = :user_id", user_id = user_id)["username"]
    isbn = request.form.get("isbn")
    if request.form.get("rating"):
        db.execute("UPDATE reviews SET rating=:rating WHERE username=:username AND isbn=:isbn", rating=request.form.get("rating"), username=username, isbn=isbn")
    if request.form.get("review"):
        bb.execute("UPDATE reviews SET review=:review WHERE username=:username AND isbn=:isbn", review=request.form.get("review"), username=username, isbn=isbn")
    flash("Thank you for your review!")
    return render_template("book.html")
