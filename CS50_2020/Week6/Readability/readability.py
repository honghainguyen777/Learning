from cs50 import get_string

string = get_string("Text: ")

length = len(string)

# initiallize letter, word and sentence counters
n_letter = 0
# words are seperated by a space, but the last word ends with . or ? or !
# therefore add 1 for initiallizing word count
n_words = 1
n_sentence = 0

# go through every character in the input text
for i in range(length):
    # check if the char is alphabetic
    if string[i].isalpha():
        n_letter += 1

    # words are seperated by a space
    if string[i] is ' ':
        n_words += 1

    # sentences are seperated by . ! or ?
    if string[i] in ['.', '!', '?']:
        n_sentence += 1

# number of letter and sentence per 100 words
L = n_letter * 100 / n_words
S = n_sentence * 100 / n_words

# Coleman-Liau formula - readability index
index = round(0.0588 * L - 0.296 * S - 15.8)

if index <= 1:
    print("Before Grade 1")
elif index >= 16:
    print("Grade 16+")
else:
    print("Grade " + str(index))