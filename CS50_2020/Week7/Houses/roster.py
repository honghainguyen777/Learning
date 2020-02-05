# import libraries
from sys import argv, exit
from cs50 import SQL

# check if there are 2 command-line arguments
if len(argv) != 2:
    print("python roster.py house_name")
    exit(1)

# call and assign the database
db = SQL("sqlite:///students.db")

# get the needed data from the database as a list containing dicts {Key: Value} -> [{first: value, middle: value,...., birth: value)}, {same}]
data = db.execute("SELECT first, middle, last, birth FROM students WHERE house = ? ORDER BY last, first", argv[1])

# go through each dictionary in the data list, and call the needed keys
for i in range(len(data)):
    # check if the middle name is NULL (None when put into data list)
    if data[i]["middle"] == None:
        print(data[i]["first"], data[i]["last"] + ", born", data[i]["birth"])
    else:
        print(data[i]["first"], data[i]["middle"], data[i]["last"] + ", born", data[i]["birth"])
exit(0)

