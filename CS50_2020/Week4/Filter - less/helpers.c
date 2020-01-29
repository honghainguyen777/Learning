#include "helpers.h"
#include<math.h>
#include <string.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    // go through all pixels in the image
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            int r = image[i][j].rgbtRed;
            int g = image[i][j].rgbtGreen;
            int b = image[i][j].rgbtBlue;
            int averageRGB = round((r + g + b) / 3.0);
            image[i][j].rgbtRed = averageRGB;
            image[i][j].rgbtGreen = averageRGB;
            image[i][j].rgbtBlue = averageRGB;
        }
    }
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    // go through all pixels in the image
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // assign color values into r, g, and b
            int r = image[i][j].rgbtRed;
            int g = image[i][j].rgbtGreen;
            int b = image[i][j].rgbtBlue;
            // apply sepia fomular
            int sepiaRed = round(0.393 * r + 0.769 * g + 0.189 * b);
            int sepiaGreen = round(0.349 * r + 0.686 * g + 0.168 * b);
            int sepiaBlue = round(0.272 * r + 0.534 * g + 0.131 * b);

            // if sepia values are greater than 255 then assign them to 255
            if (sepiaRed > 255)
            {
                sepiaRed = 255;
            }
            if (sepiaGreen > 255)
            {
                sepiaGreen = 255;
            }
            if (sepiaBlue > 255)
            {
                sepiaBlue = 255;
            }

            // change the pixels in the image
            image[i][j].rgbtRed = sepiaRed;
            image[i][j].rgbtGreen = sepiaGreen;
            image[i][j].rgbtBlue = sepiaBlue;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    // go through in the image vertically
    for (int i = 0; i < height ; i++)
    {
        // go through only floored half of the width
        // if width is odd, the image[i][n] will mirror itself
        int n = floor(width / 2);
        for (int j = 0; j < n; j++)
        {
            //store red, green and blue in the left temporarily
            int r = image[i][j].rgbtRed;
            int g = image[i][j].rgbtGreen;
            int b = image[i][j].rgbtBlue;

            // mirror/assign the pixel in the right to the left
            image[i][j].rgbtRed = image[i][width - 1 - j].rgbtRed;
            image[i][j].rgbtGreen = image[i][width - 1 - j].rgbtGreen;
            image[i][j].rgbtBlue = image[i][width - 1 - j].rgbtBlue;

            // mirror/assign the pixel in the left to the right
            image[i][width - 1 - j].rgbtRed = r;
            image[i][width - 1 - j].rgbtGreen = g;
            image[i][width - 1 - j].rgbtBlue = b;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // create an empty struct
    RGBTRIPLE clone[height][width];
    // clone all memory of the image to clone
    memcpy(clone, image, sizeof(clone));

    // go through all pixels in the image
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // assign inital values for the sum of neighbouring pixels
            int sumRed = 0, sumBlue = 0, sumGreen = 0, count = 0;

            // if the pixel is in any edge or conner
            if (i == 0 || i == height - 1 || j == 0 || j == width - 1)
            {
                // sum all color in the neighbouring pixels
                for (int a = i - 1; a < i + 2; a++)
                {
                    for (int b = j - 1; b < j + 2; b++)
                    {
                        // if they are valid - not out of the bound
                        if (a >= 0 && a < height && b >= 0 && b < width)
                        {
                            sumRed += clone[a][b].rgbtRed;
                            sumBlue += clone[a][b].rgbtBlue;
                            sumGreen += clone[a][b].rgbtGreen;
                            count++;
                        }
                    }
                }
                // blur in the original pixel
                image[i][j].rgbtRed = round(sumRed / (count / 1.0));
                image[i][j].rgbtGreen = round(sumGreen / (count / 1.0));
                image[i][j].rgbtBlue = round(sumBlue / (count / 1.0));
            }
            // if the pixel is inner
            else
            {
                // then just sum all the neighbouring colors
                for (int a = i - 1; a < i + 2; a++)
                {
                    for (int b = j - 1; b < j + 2; b++)
                    {
                        sumRed += clone[a][b].rgbtRed;
                        sumBlue += clone[a][b].rgbtBlue;
                        sumGreen += clone[a][b].rgbtGreen;
                    }
                }
                // then blur the image's pixel
                image[i][j].rgbtRed = round(sumRed / 9.0);
                image[i][j].rgbtGreen = round(sumGreen / 9.0);
                image[i][j].rgbtBlue = round(sumBlue / 9.0);
            }
        }
    }
    return;
}
