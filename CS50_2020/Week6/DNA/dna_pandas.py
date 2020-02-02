from sys import argv, exit
import pandas as pd
import re


def main():

    if len(argv) != 3:
        print("python dna.py data.csv sequence.txt")
        exit(1)

    # open csv file
    data_file = pd.read_csv(argv[1])
    sequence_file = pd.read_csv(argv[2])

    # take the string in the sequence file
    for i in sequence_file:
        sequence = i
    # create an empty array to store the STRs
    STRs = []

    # all STR's names
    STR_names = list(data_file)[1:]
    # read all the STRs start from index 1
    for name in STR_names:
        STR = find_largest_STR(name, sequence)
        STRs.append(STR)

    # read through every person in the database
    for i in range(len(data_file)):
        # .iloc[i, ] is used to take all ith row's values, [1: ] is used to
        # remove the first element-person's name in the created list
        person_STRs = list(data_file.iloc[i, ])[1:]

        # initialize matched STR counts
        n = 0

        # check if the the number of STR counts matched between the sequence and data
        for j in range(len(STRs)):
            if (person_STRs == STRs):
                n += 1

        # if STR counts match exactly with any of the individuals
        if n == len(STRs):
            print(data_file.iloc[i, 0])
            exit(0)

    print("No match")
    exit(2)

# return the longest run of consecutive repeats of the STR in the DNA sequence


def find_largest_STR(name, sequence):
    for n in range(1000):
        find = re.search(name * n, sequence)
        if bool(find) == False:
            # return the previous n times continuously matching
            # where the longest run of consecutive repeats of the STR in the DNA sequence
            return n - 1


main()
