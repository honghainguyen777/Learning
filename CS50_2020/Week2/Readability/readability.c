#include<stdio.h>
#include<cs50.h>
#include<string.h>
#include<ctype.h>
#include<math.h>

// declare functions
int letterCount(string inputStr, int n);
int wordCount(string inputStr, int n);
int sentenceCount(string inputStr, int n);

// Main function here
int main(void)
{
    // get string from user
    string inputStr = get_string("Text: ");

    // number of chars in the string
    int n = strlen(inputStr);

    // number of letter per 100 words
    float L = letterCount(inputStr, n) * 100.0 / wordCount(inputStr, n);

    // number of sentences per 100 words
    float S = sentenceCount(inputStr, n) * 100.0 / wordCount(inputStr, n);

    // Coleman-Liau formula - readability index
    int index = round(0.0588 * L - 0.296 * S - 15.8);

    // check grade
    if (index <= 1)
    {
        printf("Before Grade 1\n");
    }
    else if (index >= 16)
    {
        printf("Grade 16+\n");
    }
    else
    {
        printf("Grade %d\n", index);
    }
}

// Function for counting number of letters
int letterCount(string inputStr, int n)
{
    int letterCount = 0;
    for (int i = 0; i < n; i++)
    {
        // if ((inputStr[i] >=65 && inputStr[i] <= 90) | (inputStr[i] >=97 && inputStr[i] <= 122))
        if (isalpha(inputStr[i]))
        {
            letterCount++;
        }
    }
    return letterCount;
}

// Function for counting number of words
int wordCount(string inputStr, int n)
{
    int wordCount = 0;
    for (int i = 0; i < n; i++)
    {
        if (inputStr[i] == ' ')
        {
            wordCount++;
        }
    }
    // as one for the last word without space
    return wordCount + 1;
}

// Function for counting number of sentences
int sentenceCount(string inputStr, int n)
{
    int sentenceCount = 0;
    for (int i = 0; i < n; i++)
    {
        if (inputStr[i] == '.' | inputStr[i] == '!' | inputStr[i] == '?')
        {
            sentenceCount++;
        }
    }
    return sentenceCount;
}