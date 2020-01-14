#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main(int argc, string argv[])
{
    //check the program running with one command-line argument
    if (argc != 2)
    {
        printf("Usage: ./caesar key\n");
        return 0;
    }
    char *cipers = argv[1];
    int length = strlen(cipers);
    int shift(char c);

    //if cipers are characters
    bool checkChar(char c);
    for (int i = 0; i < length; i++)
    {
        if (checkChar(cipers[i]))
        {
            continue;
        }
        else
        {
            printf("Usage: ./caesar key\n");
            return 0;
        }
    }
    char *plaintext = get_string("plaintext: ");
    int n = strlen(plaintext);
    int x = n/length;
    printf("cipertext: ");
    char encrypt(char c, int key);
    // if plaintext's length is smaller than and equal the ciper's length
    // then check if characters in ciper are alphabets
    // if not, print the character
    // if yes, encrypt the character by key
    if (n <= length)
    {
        int charCount = 0;
        for (int l = 0; l < n; l++)
        {
            if (!checkChar(plaintext[l]))
            {
                printf("%c", plaintext[l]);
            }
            else
            {
                printf("%c", encrypt(plaintext[l], shift(cipers[charCount])));
                charCount += 1;
            }

        }
    }
    //if plaintext's length is greater than the ciper's length
    // then check if characters in ciper are alphabets
    // if not, print the character
    // if yes, encrypt the character by key
    else
    {
        int charCount = 0;
        for (int l = 0; l < n; l++)
        {
            if (!checkChar(plaintext[l]))
            {
                printf("%c", plaintext[l]);
            }
            else
            {
                for (int i = 0; i < x; i++)
                {
                    for (int j = 0; j < length; j++)
                    {
                        if (charCount == (i*length + j)) //use charCount to get j
                        {
                            printf("%c", encrypt(plaintext[l], shift(cipers[j])));

                            break;
                        }
                    }
                }
                charCount = charCount + 1;
            }
        }
    }
    printf("\n");
    return 0;
}

//shift value
int shift(char c)
{
    if (isupper(c))
    {
        return (c - 65);
    }
    else if (islower(c))
    {
        return (c - 97);
    }
    else
    {
        return c;
    }
}
//check lower or upper case chars
char encrypt(char c, int key)
{
    if (isupper(c))
    {
        return ((c - 65 + key)%26 + 65);
    }
    else if (islower(c))
    {
        return ((c - 97 + key)%26 + 97);
    }
    else
    {
        return c;
    }
}
//check if the input is either character or not
bool checkChar(char c)
{
    if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))
    {
        return true;
    }
    else
    {
        return false;
    }
}