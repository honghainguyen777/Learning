# import libraries
from sys import argv, exit
import csv
from cs50 import SQL


def main():
    # check if there are 2 command-line arguments
    if len(argv) != 2:
        print("python import.py characters.csv")
        exit(1)

    # take name, house and birth of each student into lists
    names, houses, birth = read_data(argv[1])
    # open the students.db database
    db = SQL("sqlite:///students.db")

    # create a new students table in the students database with provided keys and value datatypes IF THE TABLE DOES NOT EXIST
    # db.execute("CREATE TABLE students (first TEXT, middle TEXT, last TEXT, house TEXT, birth NUMERIC)")

    # Insert each student and their house and birth into the students table
    for i in range(len(names)):
        # if the student has a middle name, then insert the middle name in
        if len(names[i]) == 3:
            db.execute("INSERT INTO students (first, middle, last, house, birth) VALUES (?, ?, ?, ?, ?)",
                       names[i][0], names[i][1], names[i][2], houses[i], birth[i])
        # if not, then let the middle name becomes NULL
        else:
            db.execute("INSERT INTO students (first, middle, last, house, birth) VALUES (?, NULL, ?, ?, ?)",
                       names[i][0], names[i][1], houses[i], birth[i])
    # all students' information is loaded, the successful execution of the program
    exit(0)


def read_data(datafile):
    # empty lists of names, houses, and birth
    names = []
    houses = []
    birth = []
    # read the datafile/csv
    with open(datafile, "r") as data:
        reader = csv.reader(data)
        for row in reader:
            # append information
            names.append(row[0].split())
            houses.append(row[1])
            birth.append(row[2])
    # return the information without the first element (header of a dataframe)
    return names[1:], houses[1:], birth[1:]


main()