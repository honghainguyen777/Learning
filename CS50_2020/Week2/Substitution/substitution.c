#include<stdio.h>
#include<cs50.h>
#include<string.h>
#include<ctype.h>
#include<stdlib.h>


int main(int argc, string argv[])
{
    // if the there is no second command, then print Usage: ...
    if (argc != 2)
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }

    // check length of the command input
    int lenArgv = strlen(argv[1]);
    if (lenArgv != 26)
    {
        printf("Key must contain 26 characters.\n");
        return 1;
    }

    // check key is valid - contains all alphabetic character and each letter exactly once
    char arrayChar[26];
    for (int i = 0; i < 26; i++)
    {
        // is the character is alphabetic?
        if (isalpha(argv[1][i]))
        {
            // does the character exist in the arrayChar?
            for (int j = 0; j < 26; j++)
            {
                if (argv[1][i] == arrayChar[j])
                {
                    printf("The Key must contains each letter exactly once.\n");
                    return 1;
                }
            }
            // add the char in the key to arrayChar
            arrayChar[i] = argv[1][i];
        }
        // else not alphabetic - prompt error and end the program
        else
        {
            printf("The Key must contains only alphabetic char\n");
            return 1;
        }
    }

    // prompt user for a plaintext
    string plaintext = get_string("plaintext: ");
    int lenPT = strlen(plaintext);

    // print out ciphertext
    printf("ciphertext: ");

    // encrypting all characters in the plaintext according to the Key
    for (int i = 0; i < lenPT; i++)
    {

        // if the char is alphabetic and is lower
        if (isalpha(plaintext[i]) && islower(plaintext[i]))
        {
            // then text find its position between 0 and 25
            int pos = plaintext[i] - 97;

            // convert the corresponding char in the key if it is upper case
            if (islower(argv[1][pos]))
            {
                printf("%c", argv[1][pos]);
            }
            else
            {
                // 32 is the gap between the upper and lower 97 - 65
                printf("%c", argv[1][pos] + 32);
            }
        }

        // else if char is alphabetic and is upper
        else if (isalpha(plaintext[i]) && isupper(plaintext[i]))
        {
            // then text find its position between 0 and 25
            int pos = plaintext[i] - 65;

            // convert the corresponding char in the key if it is upper case
            if (islower(argv[1][pos]))
            {
                printf("%c", argv[1][pos] - 32);
            }
            else
            {
                printf("%c", argv[1][pos]);
            }
        }

        // if char is not alphabetic, print it
        else
        {
            printf("%c", plaintext[i]);
        }
    }
    printf("\n");
    return 0;
}
