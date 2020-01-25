#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // prompt an integer for the pyramid size from user
    int n;
    do
    {
        n = get_int("Please enter an integer between 1 and 8: ");
    }
    while (n < 1 || n > 8);
    
    // Create the corressponding pyramid
    for (int i = 0; i < n; i++)
    {
        // Generate hashes each line
        for (int j = 0; j < 2 * n + 2; j++)
        {
            // add #
            if (((j >= n - i - 1) && (j <= n - 1)) || ((j >= n + 2) && (j <= n + i + 2)))
            {
                printf("#");
            }
            
            // put nothing at the end of the hash line in the right side
            else if (j > n + i + 2)
            {
                printf("");
            }
            
            // generate spaces before and between hashes
            else
            {
                printf(" ");
            }
        }
        
        // Go to the new line
        printf("\n");
    }
}
