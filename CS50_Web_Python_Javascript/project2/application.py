import os

from flask import Flask, request, render_template, redirect, session, flash
from flask_session import Session
from flask_socketio import SocketIO, emit
from helpers import login_required
from datetime import datetime

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# store chat room name
channel_list = []

# user list
user_list = []

# all messages from users
user_messages = dict()


@app.route("/")
@login_required
def index():
    username = session["username"]
    try:
        session["selected_channel"]
    except KeyError:
        return render_template("index.html", username=username, channel_list=channel_list)
    channel_name = session["selected_channel"]
    return redirect("/channels/" + channel_name)

@app.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        if username in user_list:
            flash("Username already exists.")
            return render_template("register.html")
        channel_list.append(username)
        session["username"] = username
        flash("Register, please enjoy chatting!")
        return redirect("/")
    else:
        return render_template("register.html")

@app.route("/logout")
def logout():
    username = session["username"]
    user_list.remove(username)
    session.clear()
    return redirect("/")

@app.route("/create", methods=["POST", "GET"])
@login_required
def create():
    """ Create new channel """
    if request.method == "POST":
        channel_name = request.form.get("channel_name")
        if channel_name in channel_list:
            flash("Channel name already exists.")
            return render_template("create_channel.html")
        channel_list.append(channel_name)
        user_messages[channel_name] = []
        return redirect("/channels/" + channel_name)
    else:
        return render_template("index.html")

@app.route("/channels/<channel>", methods=["GET"])
@login_required
def channels(channel):
    username = session["username"]
    session["selected_channel"] = channel
    print(user_messages)
    messages = user_messages[channel]
    return render_template("channel.html", channel=channel, username=username, messages=messages)


# dp socket.io for sending and storing messages
@socketio.on("submit message")
def message(data):
    username = session["username"]
    sent_message = data["message"]
    now = datetime.now()
    recorded_time = now.strftime("%d-%m-%Y, %H:%M")
    current_channel = session["selected_channel"]
    message_data = [username, sent_message, recorded_time]
    user_messages[current_channel].append(message_data)
    if len(user_messages[current_channel]) > 100:
        user_messages[current_channel].popleft()
    emit("broadcast", {"username": username, "message": sent_message, "channel": current_channel, "recorded_time": recorded_time}, broadcast=True)
