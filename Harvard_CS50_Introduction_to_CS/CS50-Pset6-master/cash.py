# import get_float from cs50
from cs50 import get_float
user_money = 0
# get positive amount of money from user
while (user_money <= 0):
    user_money = get_float("Change owned: ")
# convert money into coin unit
u = user_money * 100
# converting to number of coins
num_coins = u//25 + (u % 25)//10 + ((u % 25) % 10)//5 + ((u % 25) % 10) % 5
print(int(num_coins))