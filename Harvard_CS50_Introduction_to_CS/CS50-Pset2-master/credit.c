#include <cs50.h>
#include <stdio.h>
#include <math.h>
#include <string.h>
#include <ctype.h>
int main(void)
{
    int length = 0;
    long card =0;
    long a = 0;
    long powerNum(int a, int b);
    int luhnAlgorithm1(int c, long n, int a);
    int luhnAlgorithm2(int c, long n, int a);
    while (!(card >0))
    {
        card = get_long("Number: ");
        a = card;
    }
    while (a > 0)
    {
        a = a/10;
        length +=1;
    }
    int sum = luhnAlgorithm1(length, card , length) + luhnAlgorithm2(length, card , length);
    if ((length == 13 || length == 15  || length == 16) && ((sum % 10) == 0))
    {
        if (length == 15)
        {
            if (card >= powerNum(34,15) && card < powerNum(35,15))
            {
                printf("AMEX\n");
            }
            else if (card >= powerNum(37,15) && card < powerNum(38,15))
            {
                printf("AMEX\n");
            }
            else
            {
                printf("INVALID\n");
            }
        }
        else
        {
            if (card >= powerNum(40,13) && card < powerNum(50,13))
            {
                printf("VISA\n");
            }
            else if (card >= powerNum(40,16) && card < powerNum(50,16))
            {
                printf("VISA\n");
            }
            else if (card >= powerNum(51,16) && card < powerNum(56,16))
            {
                printf("MASTERCARD\n");
            }
            else
            {
                printf("INVALID\n");
            }
        }
    }
    else
    {
        printf("INVALID\n");
    }
}

    //function
long powerNum(int a, int b)
{
    return a*pow(10,b-2);
}

int luhnAlgorithm1(int c, long n, int a)
{
    if (c < 2)
    {
        return 0;
    }
    else
    {
        int x = 2*(int)((n % (long)pow(10,a-c+2)) / pow(10, a-c+1));
        if (x < 10)
        {
            return x + luhnAlgorithm1(c-2, n, a);
        }
        else
        {
            return 1 + (int)(x%10) + luhnAlgorithm1(c-2, n, a);
        }
    }
}

int luhnAlgorithm2(int c, long n, int a)
{
    if (c < 1)
    {
        return 0;
    }
    else
    {
        return ((n % (long)pow(10,a-c+1)) / pow(10, a-c)) + luhnAlgorithm2(c-2, n, a);
    }
}
