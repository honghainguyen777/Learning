#include <cs50.h>
#include <stdio.h>
#include <math.h>

int main(void)
{
    //int quarters = 25, dimes = 10, nikels = 5, pennies = 1;
    float dollars = 0;
    while (!(dollars > 0))
    {
        dollars = get_float("change owned: ");
    }
    //convert dollars to cents
    int cents = round(dollars * 100);
    int coins = cents/25 + (cents%25)/10 + ((cents%25)%10)/5 + (((cents%25)%10)%5)/1;
    printf("%i\n",coins);
}
