from sys import argv
from sys import exit
from cs50 import get_string

# check the program running with one command-line argument
if len(argv) != 2:
    print("Usage: python caesar.py k")
    exit(1)

# obtain integer k
k = int(argv[1])
# ask user input plaintext
plaintext = get_string("plaintext: ")
print("ciphertext: ", end="")
for char in plaintext:
    if char.isalpha() == True:
        if char.isupper():
            ci_letter = chr((ord(char) + k - 65) % 26 + 65)
            print(ci_letter, end="")
        else:
            ci_letter = chr((ord(char) + k - 97) % 26 + 97)
            print(ci_letter, end="")
    else:
        print(char, end="")
print()
exit(0)