# import get_int from cs50
from cs50 import get_int
# ask user to input the positive height of the pyramid
height = 0
while(height < 1 or height > 8):
    height = get_int("Height: ")
# print pyramid
for i in range(1, height + 1):
    # print space
    print(" " * (height - i), end="")
    print("#" * i, end="")
    print("  ", end="")
    print("#" * i)

