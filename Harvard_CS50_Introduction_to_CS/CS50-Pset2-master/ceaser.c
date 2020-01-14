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
        return 1;
    }
    int k = atoi(argv[1]);
    //if k is negetive or a character or a non-integer where k=0, excecute the line
    if (k <= 0)
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }
    else
    {
        string str = get_string("plaintext: ");
        int length = strlen(str);
        printf("cipertext: ");
        for (int i = 0; i < length; i++)
        {
            if (islower(str[i]))
            {
                //25 chars in lowercase, value of a char is greater than 97
                //+97 to go back to the lowercase value
                printf("%c", ((str[i])+k-97)%26+97);
            }
            else if (isupper(str[i]))
            {
                printf("%c",((str[i])+k-65)%26+65);
            }
            else
            {
                printf("%c", str[i]);
            }
        }
        printf("\n");
        return 0;
    }
}
