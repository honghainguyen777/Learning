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
        printf("Usage: ./caesar key\n");
        return 1;
    }

    // if there is second input, check if all characters are integer
    // not then print Usage: ... and return 1 (any number ! 0)
    int lenArgv = strlen(argv[1]);
    for (int i = 0; i < lenArgv; i++)
    {
        if (!isdigit(argv[1][i]))
        {
            printf("Usage: ./caesar key\n");
            return 1;
        }
    }

    // convert command-string input into an integer by atoi function
    int k = atoi(argv[1]);

    // prompt user for a string
    string plaintext = get_string("plaintext: ");

    // plaintext length
    int lenPT = strlen(plaintext);

    // print out cipertext after encoded
    printf("ciphertext: ");

    // check if every character in the plaintext is upper, lower or non alphabet
    // encode them by using the key k and ci = (pi + k) % 26 formula
    for (int i = 0; i < lenPT; i++)
    {
        if (islower(plaintext[i]))
        {
            printf("%c", (plaintext[i] + k - 97) % 26 + 97);
        }
        else if (isupper(plaintext[i]))
        {
            printf("%c", (plaintext[i] + k - 65) % 26 + 65);
        }
        else
        {
            printf("%c", plaintext[i]);
        }
    }
    printf("\n");

    // return 0 as the program ran successfully
    return 0;
}