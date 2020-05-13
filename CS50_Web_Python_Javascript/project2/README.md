# CS50-Web Project 2

## Web Programming with Python and JavaScript

## Requirements for this project

### https://docs.cs50.net/web/2020/x/projects/2/project2.html

## Features of the app

### Create display name
![](https://i.imgur.com/BMHCRBq.jpg)

### Create or join a channel
![](https://i.imgur.com/9kF3Etf.jpg)
- After the nickname is created, you are allowed to create a new chatting channel or join an existing channel

### Start chatting with your friends or strangers
![](https://i.imgur.com/6fzbFMr.jpg)
- This chatting feature allows for multiple users. The crollable bar will make the application easier to be seen without changing the size of the chatting container.

### Other features
- When user leave the website (but not leave the channel or sign out), the user can re-enter last channel.
- When leaving a channel: an announcement is out for anybody in the channel
- If everyone has left a channel, the channel will be deleted
- When a channel is created or deleted by other users, the channel will appear or disappear in other user's browsers without refreshing the page
- Users can enter and re-enter multiple channel
- One user signs out, the display name will be deleted, and user will automatically leave all channels

### Folder and files in this project
- In the remote folder you will find an application.py file contain all flask and SocketIO code serving as backend/server. a "requiremets.txt" file for initial configuration of the app (see below).
- A subfolder named "static" contains a javaScript file (index.js). This JS file handles events that users create on the web page such as sending message, creating a new channel, entering an existing channel, leaving channel.... This JS file will then help to communicate with the server. In the folder, a stylesheet css file is included.
- The "template" subfolder contains a "layout.html" file makes styles for the website. The "index.html" file contains just html code for the display name creation page (a bootstrap card). The "Channel.html" file contains the main html code built for this chatting app. It contains 2 empty unordered lists used as holders to place messages and channels created by users through implementing JS code.

### Install Python and flask

#### Download and install Python:

- [Link here](https://www.python.org/downloads/)
- Remember to check the pip installation box or [install it](https://pip.pypa.io/en/stable/installing/) separately

#### Install Flask through terminal (first time only):
```bash
$ pip install Flask
$ pip install Flask-SocketIO
$ pip install Flask-Session
$ pip install werkzeug
$ pip install requests
$ pip install datetime
```

#### Download the BookQuery
```bash
$ git clone https://github.com/honghainguyen777/bookquery.git
$ cd bookquery
```

#### Start the BookQuery application
```bash
# Install requrements for the application (pip or pip3)
$ pip3 install -r requirements.txt

# set environment variable (Windows)
$ set FLASK_APP=application.py
$ set FLASK_DEBUG=1
$ set DATABASE_URL= (paste Postgres database URI here, register see below)

# set environment variable (for Mac or Linux)
$ export FLASK_APP=application.py
$ export FLASK_DEBUG=1
$ export DATABASE_URL= (paste Postgres database URI here, register see below)
```

##### Update all tables and data into the Heroku database server
```bash
$ python import.py
```

## Run the program and enjoy developing
```bash
$ flask run
```

#### Register and get a free database (10000 rows)
1. Register for a free account [https://www.heroku.com/](https://www.heroku.com/)
2. On Heroku's Dashboard click "New" and choose "Create new app."
3. Name your app and "Create app"
4. On your "Overview" page, click "Configure Add-ons"
5. In the "Add-ons", and select a free "Heroku Postgres"
6. Choose the "Hobby Dev - Free" plan
7. Click "Heroku Postgress:: Database"
8. Click "Setings" and the "View Credentials" you can find all needed information

Alternative: Download your own through this [link](https://www.postgresql.org/download/)
