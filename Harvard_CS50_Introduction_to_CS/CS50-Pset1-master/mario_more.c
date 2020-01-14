#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int n = 0;
    int x = 0;
    while (!(n > 0 && n < 9))
    {
        n = get_int("Height: ");
    }
    for (int i = 1; i < n+1 ;i++)
    {
        while (x >= 0 && x < n-i)
        {
            printf(" ");
            x++;
        }
        while (x >= n-i && x < n)
        {
            printf("#");
            x++;
        }
        printf("  ");
        for (int j = 0; j < i; j++)
        {
            printf("#");
        }
        printf("\n");
        x = 0;
    }
}
