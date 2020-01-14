#include <cs50.h>
#include <stdio.h>
#include <crypt.h>
#include <string.h>
#include <ctype.h>

int main(int argc, string argv[])
{
    //check if one command-line argument is executed
    if (argc != 2)
    {
        printf("Usage: ./crack hash");
        return 1;
    }
    char check(char c, int key);
    string hash = argv[1];
    char str_salt[3];
    for (int i = 0; i < 2; i++)
    {
        str_salt[i] = hash[i];
    }
    str_salt[2] = '\0';
    int salt = atoi(str_salt);

    //get ciphertext
    printf("ciphertext: ");
    int length = strlen(hash);
    for (int i = 2; i < length; i++)
    {
        printf("%c",check(hash[i],salt));
    }

    printf("\n");
    return 0;
}
//check lower or upper case chars
char check(char c, int key)
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