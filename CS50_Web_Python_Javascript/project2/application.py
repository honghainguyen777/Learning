import os

from flask import Flask, request, render_template, redirect, session, flash
from flask_session import Session
from flask_socketio import SocketIO, emit, join_room, leave_room
from helpers import login_required
from datetime import datetime

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)
app.run(debug=True)

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# store chat room name
channel_list = []

# user list
user_list = ['thao', 'someone']

# all messages from users
user_messages = dict()


@app.route("/")
def index():
    print(channel_list)
    print(user_list)
    print(user_messages)
    if ("username" in session) and (session["username"] in user_list):
        if "selected_channel" in session:
            print(session["selected_channel"])
            return redirect("/channels/" + session["selected_channel"])
        return redirect('/create')
    # make sure the username does not in session due to some bugs from other routes
    session.clear()
    return redirect('/register')

@app.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        if username in user_list:
            flash("Username already exists.")
            return render_template("register.html")
        user_list.append(username)
        session["username"] = username
        flash("Register, please enjoy chatting!")
        return redirect("/")
    else:
        return render_template("register.html")

@app.route("/logout")
@login_required
def logout():
    print(user_list)
    username = session["username"]
    user_list.remove(str(username))
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
            return render_template("index.html")
        channel_list.append(channel_name)
        user_messages[channel_name] = []
        session["selected_channel"] = channel_name
        return redirect("/channels/" + channel_name)
    else:
        return render_template("index.html")

@app.route("/channels/<channel>", methods=["GET", "POST"])
@login_required
def channels(channel):
    # Make sure user dont modify the path
    session["selected_channel"] = channel
    if (channel in channel_list):
        username = session["username"]
        messages = user_messages[channel]
        return render_template("channel.html", channel=channel, username=username, messages=messages)
    else:
        flash("Channel does not exist")
        return render_template("index.html")

# join_room method: https://flask-socketio.readthedocs.io/en/latest/
@socketio.on('joined')
@login_required
def on_join():
    current_channel = session["selected_channel"]
    username = session["username"]
    emit('state', {"announce": username + " has joined"}, broadcast=True)

@socketio.on('left')
@login_required
def on_leave():
    username = session["username"]
    emit('state', {"announce": username + " has left"}, broadcast=True)


# dp socket.io for sending and storing messages
@socketio.on("submit message")
def message(data):
    print(data)
    username = session["username"]
    sent_message = data["message"]
    now = datetime.now()
    recorded_time = now.strftime("%d-%m-%Y, %H:%M")
    current_channel = session["selected_channel"]
    message_data = [username, sent_message, recorded_time]
    user_messages[current_channel].append(message_data)
    print(user_messages)
    if len(user_messages[current_channel]) > 100:
        user_messages[current_channel].popleft()
    emit("announce message", {"current_channel": current_channel, "message_data" :message_data}, broadcast=True)
