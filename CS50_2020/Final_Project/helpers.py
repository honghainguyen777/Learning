import os
import requests

from flask import redirect, render_template, request, session
from functools import wraps


def login_required(f):
    """
    Decorate routes to require login.

    http://flask.pocoo.org/docs/1.0/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function


def usd(value):
    """Format value as USD."""
    return f"${value:,.2f}"

def card_check(card):
    length = len(card)
    # sum degits
    sum_other = 0
    sum_those = 0
    for i in range(length - 2, -1, -2):
        temp = 2 * int(card[i])
        sum_other += temp // 10 + temp % 10
    for i in range(length - 1, -1, -2):
        sum_those += int(card[i])
    add_sum = sum_those + sum_other
    # check if sum%10 = 0?
    if (add_sum % 10) != 0:
        return False
    else:
        # take 2 first number
        start_nums = int(card[0]) * 10 + int(card[1])
        # check if the card is a real card with 13 or 15 or 16 numbers and start with valid digits
        if (length == 15 and (start_nums == 34 or start_nums == 37)) or (length == 16 and (start_nums >= 51 and start_nums <= 55)) or ((length == 13 or length == 16) and start_nums >= 40 and start_nums < 50):
            return True
        else:
            return False