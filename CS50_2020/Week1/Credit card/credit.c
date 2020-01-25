#include <stdio.h>
#include <cs50.h>
#include <math.h>
//declare functions
bool checkSum(long number, int digits);
string checkFirstDigits(long number, int digits);

// Main code
int main(void)
{
    // check valid number inputted
    long number;
    do
    {
        number = get_long("Number: ");
    }
    while (number < 0);
    
    
    // Check type of inputted card
    if (number == 0)
    {
        printf("INVALID\n");
    }
    else
    {
        // check the number of digits 13, 15 or 16?
        int n = round(floor(log10(number))) + 1;
        if ((n == 15) | (n == 16) | (n == 13)) 
        {
            // if the Luhn's algorihm returns true
            bool sum = checkSum(number, n);
            if (sum == 1)
            {
                printf("%s\n", checkFirstDigits(number, n));
            }
            else
            {
                printf("INVALID\n");
            }
        }
        else
        {
            printf("INVALID\n");
        }
    }
    
}


// function for checking the sum according to Luhn's Algorithm
bool checkSum(long number, int digits)
{
    int sumMul = 0;
    int sumNoMul = 0;
    // go through each digit in the number
    for (int i = 0; i < digits; i++)
    {
        // algorithm for going through all digits
        int digit = (long)(number / pow(10, i)) % 10;
        if ((i % 2) == 1)
        {
            // add the second-to-last digit to the sum
            sumMul = sumMul + (digit * 2) / 10 + (digit * 2) % 10;
        }
        else
        {
            // add the left number to the sum without doubling
            sumNoMul = sumNoMul + digit;
        }
    }
    // check valid according to Luhn's Algorithm, last digit of the sum is 0?
    int sumAll = sumMul + sumNoMul;
    if (sumAll % 10 == 0)
    {
        return true;
    }
    else
    {
        return false;
    }        
}

// check the card number either start with 4, 34, 37 or between 51 and 55?
string checkFirstDigits(long number, int digits)
{
    // extract the first and the second digits
    int firstOne = (long)(number / pow(10, digits - 1));
    int firstTwo = (long)(number / pow(10, digits - 2));
    if (firstOne == 4)
    {
        return "VISA";
    }
    else if (firstTwo == 37 | firstTwo == 34)
    {
        return "AMEX";
    }
    else if (firstTwo == 51 | firstTwo == 52 | firstTwo == 53 | firstTwo == 54 | firstTwo == 55)
    {
        return "MASTERCARD";
    }
    else
    {
        return "INVALID";
    }
}

