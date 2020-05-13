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

now = datetime.now()

# store chat room name
#channel_list = ['welcome']

# user list
user_list = ['ADMIN']

# all messages from users, we can make this message as default :)
user_messages = {'WELCOME': [['ADMIN', 'Thank you very much for visiting this app :)', now.strftime("%d-%m-%Y, %H:%M")]]}

channel_users = {'WELCOME': ['AMDIN']}

# delete the channel once all users left the channel
def delete_Channel(channel_name):
    if len(channel_users[channel_name]) == 0:
        del channel_users[channel_name]
        del user_messages[channel_name]
        return True
    else:
        return False

# add the user into the user list of the the channel once user joins or create a channel
def addUser_channel(channel_name, username):
    if channel_name in channel_users:
        if username not in channel_users[channel_name]:
            channel_users[channel_name].append(username)
    else:
        channel_users[channel_name] = [username]

# remove user when user left the channel
def removeUser_channel(channel_name, username):
    if channel_name in channel_users:
        if username in channel_users[channel_name]:
            channel_users[channel_name].remove(username)

# return a list of all existing channel
def channel_list():
    list_channel = list(channel_users.keys())
    return list_channel

@app.route("/")
def index():
    if ("username" in session) and (session["username"] in user_list):
        if "selected_channel" in session:
            return redirect("/channels/" + session["selected_channel"])
        return redirect('/channels/create')
    # make sure the username does not in session due to some bugs from other routes
    session.clear()
    return redirect('/register')

@app.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        username = request.form.get("username").upper()
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
    username = session["username"]
    # remove user from any channel
    list_channel = channel_list()
    user_list.remove(str(username))
    session.clear()
    for channel in list_channel:
        removeUser_channel(channel, username)
        delete_status = delete_Channel(channel)
        if (delete_status):
            socketio.emit('del_channel', {"channel": channel}, broadcast=True)
    return redirect("/register")

@app.route("/create", methods=["POST", "GET"])
@login_required
def create():
    """ Create new channel """
    if request.method == "POST":
        channel_name = request.form.get("channel_name").upper()
        if channel_name in channel_list():
            flash("Channel name already exists.")
            return redirect("/channels/create")
        addUser_channel(channel_name, session["username"])
        user_messages[channel_name] = []
        socketio.emit('add_channel', {"channel": channel_name}, broadcast=True)
        return redirect("/channels/" + channel_name)
    else:
        return redirect("/channels/create")

@app.route("/channels/<channel>", methods=["GET", "POST"])
@login_required
def channels(channel):
    # Make sure user dont modify the path
    allChannels = channel_list()
    if channel == "create":
        return render_template("channel.html", channel=channel, allChannels=allChannels, username=session["username"], check_channel = 0)
    elif (channel.upper() in allChannels):
        channel = channel.upper()
        session["selected_channel"] = channel
        username = session["username"]
        messageData = user_messages[channel]
        return render_template("channel.html", channel=channel, allChannels = allChannels, username=username, messageData=messageData, check_channel=1)
    else:
        flash("Channel does not exist")
        return redirect("/channels/create")

@socketio.on('joined')
@login_required
def on_join(data):
    current_channel = data["current_channel"]
    session["selected_channel"] = current_channel
    username = session["username"]
    messageData = user_messages[current_channel];
    addUser_channel(current_channel, username)
    emit('state', {"type": "join", "announce": username + " has joined", "current_channel": current_channel}, broadcast=True)

# if user currently in the channel userlist, not annouce when he entered

# a function so that the users can only stay in maximum 3 rooms, if more make a noucement

# a function so that maximum 20 channel exist

@socketio.on('getData')
@login_required
def get_data(data):
    channel = data["current_channel"]
    messageData = user_messages[channel];
    emit('emitData', {"messageData" : messageData}, broadcast=False)

@socketio.on('getAllChannel')
@login_required
def emit_channel():
    allChannels = channel_list()
    emit('emitChannel', {"allChannels": allChannels})

@socketio.on('left')
@login_required
def on_leave():
    username = session["username"]
    current_channel = session["selected_channel"]
    removeUser_channel(current_channel, username)
    session.pop("selected_channel")
    del_succeed = delete_Channel(current_channel)
    emit('state', {"type": "leave", "announce": username + " has left", "current_channel": current_channel}, broadcast=True)
    # delete only if no user in the channel and emit the change to all users
    if del_succeed:
        emit('del_channel', {"channel": current_channel}, broadcast=True)

@socketio.on('change_channel')
@login_required
def change(data):
    channel = data["select_channel"]
    print("/channels/" + channel)
    return redirect("/channels/" + channel)


# dp socket.io for sending and storing messages
@socketio.on("submit message")
def message(data):
    username = session["username"]
    sent_message = data["message"]
    recorded_time = now.strftime("%d-%m-%Y, %H:%M")
    current_channel = session["selected_channel"]
    message_data = [username, sent_message, recorded_time]
    user_messages[current_channel].append(message_data)
    if len(user_messages[current_channel]) > 100:
        user_messages[current_channel].popleft()
    emit("announce message", {"current_channel": current_channel, "message_data" :message_data}, broadcast=True)
