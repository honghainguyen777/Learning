from sys import argv
from sys import exit
from cs50 import get_string


def main():
    # check the program running with one command-line argument
    if len(argv) != 2:
        print("Usage: python vigenere.py k")
        exit(1)
    # get ciper
    ciper = argv[1]
    # check if ciper is alphabets
    for item in ciper:
        if item.isalpha() == False:
            print("Usage: python vigenere.py k")
            exit(1)

    plaintext = get_string("plaintext: ")
    print("ciphertext: ", end="")
    pl = len(plaintext)
    cl = len(ciper)
    n = pl//cl

    # length of plaintext is less then that of ciper
    if pl <= cl:
        charCount = 0
        for i in range(0, pl):
            if plaintext[i].isalpha() == False:
                print(plaintext[i], end="")
            else:
                print(encrypt(plaintext[i], shift(ciper[charCount])), end="")
                charCount += 1
    else:
        charCount = 0
        # count entire plaintext'length to encrypt it's chars
        for i in range(0, pl):
            # check if the element is an alphabet, if not, simply print the element
            if plaintext[i].isalpha() == False:
                print(plaintext[i], end="")
            # if yes, print the encrypted char
            else:
                # count from 0 to pl/cl, (pl/cl-1)*cl + (l - 1) = pl - 1.
                # so maximum count is length of plaintext - 1
                # from that we can then substract the space and non-alphabet elements
                # anh the round of cipher is reversed.
                for j in range(0, n):
                    for l in range(0, cl):
                        if charCount == (j * cl + l):
                            key = shift(ciper[l])
                            print(encrypt(plaintext[i], key), end="")
                            break
                charCount += 1
    print()
    exit(0)


def shift(c):
    if c.isupper():
        return (ord(c) - 65)
    else:
        return (ord(c) - 97)


def encrypt(char, key):
    if char.isupper():
        return chr((ord(char) - 65 + key) % 26 + 65)
    elif char.islower():
        return chr((ord(char) - 97 + key) % 26 + 97)
    else:
        return char


if __name__ == '__main__':
    main()

