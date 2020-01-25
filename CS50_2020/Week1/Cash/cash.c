#include <stdio.h>
#include <cs50.h>
#include <math.h>

int main(void)
{
    // prompt the amount of money given by customer
    float amount;
    do
    {
        amount = get_float("Change owned: ");
    }
    while (amount <= 0);
    
    // convert dolars to cents
    int coins = round(amount * 100);
    
    int quaters = coins / 25;
    int dimes = (coins % 25) / 10;
    int nickels = ((coins % 25) % 10) / 5;
    int pennies = ((coins % 25) % 10) % 5;
    int total = quaters + dimes + nickels + pennies;
    printf("%i\n", total);
}
