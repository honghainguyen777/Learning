from sys import argv
from sys import exit
import crypt


def check(password, salt, h):
    encrypted = crypt.crypt(password, str(salt))
    if h == encrypted:
        print(password)
        exit(2)


# check the program running with one command-line argument
if len(argv) != 2:
    print("Usage: python crack.py hash")
    exit(1)
# obtain hash tring
h = argv[1]
salt = int(h[0] + h[1])
list_ascii = list(range(65, 91)) + list(range(97, 123))
guess = list()
# all password's characters can be combined with maximum number of chars - 5 as the below
# unfortunately, it will take so long time to crack a password with only 1 char
# since the nested loop will start from the lowest level of the loop
# it is easy to crack a password with 5 characters rather than less characters
# more over password starts with high index of ascii, the cracking talks even longer
for c1 in list_ascii:
    # crack the password having 1 char
    check(chr(c1), salt, h)
    for c2 in list_ascii:
        # crack the password having 2 chars
        temp2 = chr(c1) + chr(c2)
        check(temp2, salt, h)
        for c3 in list_ascii:
            # crack the password having 3 chars
            temp3 = chr(c1) + chr(c2) + chr(c3)
            check(temp3, salt, h)
            for c4 in list_ascii:
                # crack the password having 4 chars
                temp4 = chr(c1) + chr(c2) + chr(c3) + chr(c4)
                check(temp4, salt, h)
                # crack the password having 5 chars
                for c5 in list_ascii:
                    temp5 = chr(c1) + chr(c2) + chr(c3) + chr(c4) + chr(c5)
                    check(temp5, salt, h)