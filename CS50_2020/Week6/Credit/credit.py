# import get_int from cs50
from cs50 import get_int

# get user's input
n = 0
while (n <= 0):
    n = get_int("Number: ")
# convert to string to make the char calling easier
s = str(n)
length = len(s)
# sum degits
sum_other = 0
sum_those = 0
for i in range(length - 2, -1, -2):
    temp = 2 * int(s[i])
    sum_other += temp // 10 + temp % 10
for i in range(length - 1, -1, -2):
    sum_those += int(s[i])
add_sum = sum_those + sum_other
# check if sum%10 = 0?
if (add_sum % 10) != 0:
    print("INVALID")
else:
    # take 2 first number
    start_nums = int(s[0]) * 10 + int(s[1])
    # check if the card is a real card with 13 or 15 or 16 numbers and start with valid digits
    if (length == 15 and (start_nums == 34 or start_nums == 37)):
        print("AMEX")
    elif (length == 16 and (start_nums >= 51 and start_nums <= 55)):
        print("MASTERCARD")
    elif ((length == 13 or length == 16) and start_nums >= 40 and start_nums < 50):
        print("VISA")
    else:
        print("INVALID")
