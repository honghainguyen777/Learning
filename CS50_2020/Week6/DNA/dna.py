from sys import argv, exit
import csv
import re


def main():

    if len(argv) != 3:
        print("python dna.py data.csv sequence.txt")
        exit(1)

    # read sequence file and take the DNA string only
    sequence = file_reader(argv[2])[0][0]

    # read database file
    database = file_reader(argv[1])
    # read only STR names
    STR_names = database[0][1:]
    # information of longest-repeated STRs of the sequence
    info_STRs = []
    for STR in STR_names:
        n_repeat = find_largest_STR(STR, sequence)
        info_STRs.append(n_repeat)

    # read through every person in the database
    for person in database[1:]:
        n = 0
        # check if the the number of STR counts matched between the sequence and data
        for i in range(len(STR_names)):
            # check if the the number of STR counts matched between the sequence and data
            if (info_STRs[i] == int(person[i + 1])):
                n += 1
                continue
            else:
                break
        # if STR counts match exactly with any of the individuals
        if n == len(STR_names):
            print(person[0])
            exit(0)

    print("No match")
    exit(2)

# return the longest run of consecutive repeats of the STR in the DNA sequence


def file_reader(file):
    # read the file into a data list
    # empty data_list
    data_list = []
    # open the file and read it to file
    with open(file, "r") as file:
        reader = csv.reader(file)
        # all rows in the reader
        for row in reader:
            # append it to data list
            data_list.append(row)
    return data_list


def find_largest_STR(name, sequence):
    for n in range(1000):
        find = re.search(name * n, sequence)
        if bool(find) == False:
            # return the previous n times continuously matching
            # where the longest run of consecutive repeats of the STR in the DNA sequence
            return n - 1


main()
