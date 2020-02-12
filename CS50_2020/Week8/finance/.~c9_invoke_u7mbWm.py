import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime

from helpers import apology, login_required, lookup, usd

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
db = SQL("sqlite:///finance.db")

# Make sure API key is set
if not os.environ.get("API_KEY"):
    raise RuntimeError("API_KEY not set")


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    user_id = session["user_id"]

    # query db for current stock and balance information
    current_stocks = db.execute("SELECT symbol FROM transactions WHERE user_id = :user_id GROUP BY symbol", user_id = user_id)
    balance = db.execute("SELECT cash FROM users WHERE id = :user_id", user_id = user_id)

    # initialize the grand_total
    grand_total = balance[0]["cash"]
    if current_stocks != []:

        # initialize a storages for storing information
        storages = []

        # go through all symbol in the current stocks and lookup for price
        for symbol in current_stocks:
            lookup_info = lookup(symbol["symbol"])
            current_price = lookup_info["price"]
            stock_info = {}

            # query the sum of the shares for the symbol
            shares_info = db.execute("SELECT SUM(shares) AS shares_sum FROM transactions WHERE user_id = :user_id\
                                    AND symbol = :symbol", user_id = user_id, symbol = symbol["symbol"])
            number_of_shares = shares_info[0]["shares_sum"]

            # check if the number of shares is valid, then calculate the current value of them
            if number_of_shares > 0:
                stock_info["symbol"] = symbol["symbol"]
                stock_info["name"] = lookup_info["name"]
                stock_info["price"] = usd(current_price)
                stock_info["shares"] = number_of_shares
                total = current_price * number_of_shares
                # update the grand_total
                grand_total += total
                stock_info["total"] = usd(total)
                # append all information into storages
                storages.append(stock_info)
        return render_template("index.html", storages=storages, cash=usd(balance[0]["cash"]), grand_total = usd(grand_total))
    else:
        return render_template("index.html", cash=usd(balance[0]["cash"]), grand_total=usd(grand_total))


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "POST":

        # check if the user inputted correctly
        if not request.form.get("symbol"):
            return apology("Provide a symbol!", 403)
        elif not request.form.get("shares"):
            return apology("Provide a number of shares", 403)
        symbol = request.form.get("symbol")
        shares = float(request.form.get("shares"))

        # lookup for the current price and info
        lookup_info = lookup(symbol)
        user_id = session["user_id"]
        if not lookup_info:
            return apology("Invalid symbol!", 403)

        # query the current cash
        balance = db.execute("SELECT cash FROM users WHERE id = :id", id = user_id)[0]["cash"]

        # total amount of money to buy the shares
        buy_in = shares * lookup_info["price"]
        if buy_in > balance:
            return apology("Your balance is not enough", 403)

        # insert the bought shares into transition history
        db.execute("INSERT INTO transactions (user_id, stock_name, symbol, price, shares, total, date) VALUES(?, ?, ?, ?, ?, ?, ?)",
                    user_id, lookup_info["name"], lookup_info["symbol"],
                    lookup_info["price"], int(shares), buy_in, datetime.now())

        # update the balance
        new_balance = balance - buy_in
        db.execute("UPDATE users SET cash=:cash WHERE id=:id", cash = new_balance, id = user_id)
        flash("Bought!")
        return redirect("/")
    else:
        return render_template("buy.html")

@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    user_id = session["user_id"]

    # query for transaction history from database
    trans_data = db.execute("SELECT * FROM transactions WHERE user_id = :user_id", user_id = user_id)

    # go to every transaction and change the total and price to usd format
    for transaction in trans_data:
        transaction["total"] = usd(transaction["total"])
        transaction["price"] = usd(transaction["price"])
    return render_template("history.html", storages = trans_data)

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                          username=request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

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


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():

    # render the quote.html when the method is GET
    if request.method == "GET":
        return render_template("quote.html")
    else:
        symbol = request.form.get("symbol")

        # render an apology if the symbol is missing
        if not request.form.get("symbol"):
            return apology("Missing symbol!", 403)

        # lookup for the information of the stock symbol
        lookup_info = lookup(symbol)

        # ensure the symbol exists
        if not lookup_info:
            return apology("Invalid symbol!", 403)

        # lookup for the current price
        lookup_info["price"] = usd(lookup_info["price"])
        return render_template("quoted.html", stock = lookup_info)


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":

        # get input information from user
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        # check if user type correctly
        if not username:
            return apology("You must provide an username!", 403)
        elif not password:
            return apology("You must provide a password!", 403)
        elif not confirmation:
            return apology("Password does not match!", 403)

        # check if the password and its confirmation are matched
        elif password != confirmation:
            return apology("Password does not match!", 403)

        # check if the username exists in the database
        elif db.execute("SELECT username FROM users WHERE username = :username", username = username):
            return apology("Username has already existed!", 403)

        # hash the password and insert the registration to the users database
        hashed_password = generate_password_hash(password)
        db.execute("INSERT INTO users (username, hash) VALUES (:username, :hash)", username = username, hash = hashed_password)
        session["user_id"] = db.execute("SELECT id FROM users WHERE username = :username", username = username)

        # registered and return to the homepage
        flash("Registered!")
        return redirect ("/")
    else:
        return render_template("register.html")

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

        # check if user inputted correctly
        if not current_password:
            return apology("Missing password", 403)
        elif not new_password:
            return apology("Enter your new password")
        elif not confirmation or new_password != confirmation:
            return apology("Password does not match", 403)

        # query for user information
        user = db.execute("SELECT * FROM users WHERE id = :user_id", user_id = user_id)

        # compare the current password hashes
        if not check_password_hash(user[0]["hash"], current_password):
            return apology("Wrong current password", 403)
        else:
            # hash the new password and update the database
            hash = generate_password_hash(new_password)
            db.execute("UPDATE users SET hash = :hash WHERE id = :user_id", hash=hash, user_id=user_id)
        flash("Password has been changed!")
        return redirect("/logout")
    else:
        return render_template("account.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    if request.method == "POST":
        user_id = session["user_id"]

        # get the inputs from user
        symbol = request.form.get("symbol")
        sell_shares = int(request.form.get("shares"))

        # check if the user typed correctly
        if not symbol:
            return apology("Please enter your stock symbol", 403)
        elif not current_shares:
            return apology("You don't have enough.", 403)

        # lookup for the current info of the stock symbol and query the total shares the user has
        lookup_info = lookup(symbol)
        shares_info = db.execute("SELECT SUM(shares) as shares_sum FROM transactions WHERE user_id = :user_id\
                                AND symbol = :symbol", user_id = user_id, symbol = symbol)
        current_shares = shares_info[0]["shares_sum"]

        # check if the current shares is smaller than the shares user wants to sell
        if current_shares < sell_shares:
            return apology("You don't have enough.", 403)

        # get current price of the stock
        current_price = lookup_info["price"]

        # check user's balance
        balance = db.execute("SELECT cash FROM users WHERE id=:user_id", user_id = user_id)[0]["cash"]

        # calculate the sell amount
        sell = current_price * float(sell_shares)

        # update the total cash
        new_balance = balance + sell
        db.execute("UPDATE users SET cash=:cash WHERE id = :user_id", cash = new_balance, user_id = user_id)

        # insert the transaction detail to history
        db.execute("INSERT INTO transactions (user_id, stock_name, symbol, price, shares, total, date) VALUES(?, ?, ?, ?, ?, ?, ?)",
                    user_id, lookup_info["name"], lookup_info["symbol"],
                    lookup_info["price"], int(-sell_shares), sell, datetime.now())
        flash("Sold!")
        return redirect("/")
    else:
        return render_template("sell.html")


@app.route("/balance", methods=["GET", "POST"])
@login_required
def balance():
    """Change balance"""
    user_id = session["user_id"]

    # query the user's hashed password
    hashPw = db.execute("SELECT hash FROM users WHERE id = :user_id",
                        user_id=user_id)
    if request.method == "POST":

        # get cash information
        cash_info = db.execute("SELECT cash FROM users WHERE id = :user_id",
                               user_id=user_id)

        # check if user typed correctly all fields in the form
        if not request.form.get("card"):
            return apology("Missing card", 403)
        elif not request.form.get("ccv"):
            return apology("Missing CCV code", 403)
        elif not request.form.get("cash"):
            return apology("Amout of cash", 403)
        elif not check_password_hash(hashPw[0]["hash"], request.form.get("currentPassword")):
            return apology("Wrong current password!", 403)
        else:
            # check credit card validation
            card = str(request.form.get("card"))
            length = len(card)
            cash = float(request.form.get("cash"))

            # take the 2 first number of the card
            start_nums = int(card[0]) * 10 + int(card[1])

            # check the number of card digits and the validation of the card/card prividers
            if (length == 15 and (start_nums == 34 or start_nums == 37))\
                    or (length == 16 and (start_nums >= 51 and start_nums <= 55))\
                    or ((length == 13 or length == 16) and start_nums >= 40 and start_nums < 50):

                # if the payment method is deposit
                if request.form.get("method") == "deposit":
                    # update new balance
                    newBalance = cash + cash_info[0]["cash"]
                    db.execute("UPDATE users SET cash = :cash WHERE id = :user_id",
                               cash=newBalance, user_id=user_id)

                    # save the transactions to the cash_trans
                    db.execute("INSERT INTO cash_trans (user_id, cash_change, card, ccv, date) VALUES(?, ?, ?, ?, ?)",
                               user_id, cash, int(card), int(request.form.get("ccv")), datetime.now())
                    flash("Deposited")
                    return redirect("/")

                # if the user wants to withdraw
                elif request.form.get("method") == "withdraw":
                    if cash > cash_info[0]["cash"]:
                        return apology("Can't afford!", 400)
                    else:
                        # update new balance
                        newBalance = cash_info[0]["cash"] - cash
                        db.execute("UPDATE users SET cash = :cash WHERE id = :user_id",
                                   cash=newBalance, user_id=user_id)

                        # save the trans history
                        db.execute("INSERT INTO cash_trans (user_id, cash_change, card, ccv, date) VALUES(?, ?, ?, ?, ?)",
                                   user_id, -cash, int(card), int(request.form.get("ccv")), datetime.now())
                        flash("Withdrawn")
                        return redirect("/")
                else:
                    return apology("Missing method")
            # else the card is not valid
            else:
                return apology("Invalid card", 400)
    else:
        return render_template("balance.html")


@app.route("/wdhistory")
@login_required
def wdhistory():
    """History of cash transfers"""

    user_id = session["user_id"]

    # get the withdraw and deposit history from the database
    info = db.execute("SELECT * FROM cash_trans WHERE user_id = :user_id", user_id=user_id)
    for transfer in info:
        transfer["cash_change"] = usd(transfer["cash_change"])
    return render_template("wdhistory.html", info=info)


def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
