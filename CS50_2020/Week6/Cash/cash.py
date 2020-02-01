# use get_float from cs50 library
from cs50 import get_float

# initialize for user input
validate = False

# check if user input is correct
while not validate:
    cash = get_float("Change owed: ")
    if cash > 0:
        validate = True
    # convert to cents
    amount = cash * 100

# number of coint possible
quaters = amount // 25
dimes = (amount % 25) // 10
nickels = ((amount % 25) % 10) // 5
pennies = ((amount % 25) % 10) % 5
total = quaters + dimes + nickels + pennies

print(int(total))