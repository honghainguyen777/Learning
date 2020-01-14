from cs50 import get_string
from sys import argv


def main():
    # check the program running with one command-line argument
    if len(argv) != 2:
        print("Usage: python bleep.py dictionary")
        exit(1)
    # open the text file and save it
    file = open(argv[1], "r")
    temp = file.readlines()
    data = set()
    for item in temp:
        data.add(item.strip("\n"))
    # prompt from user
    user_input = get_string("What message would you like to censor?\n")
    splitted = user_input.split(" ")
    print_out = list()
    # check if word in the prompted string is in banned list?
    for word in splitted:
        if word.lower() in data:
            print_out.append("*" * len(word))
        else:
            print_out.append(word)
    print(" ".join(print_out))


if __name__ == "__main__":
    main()
