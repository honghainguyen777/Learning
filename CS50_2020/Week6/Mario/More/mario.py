# import get_int from cs50 library
from cs50 import get_int

# Initialize condition
require = False
while not require:
    # prompt the user to the size of the half-pyramid
    n = get_int("Height: ")
    if n >= 1 and n <= 8:
        require = True

# go through each line
for i in range(n):
    # print hashes in each line
    print(" " * (n - i - 1) + "#" * (i + 1) + "  " + "#" * (i + 1))