#include <stdio.h>
#include <stdlib.h>

#include "bmp.h"

int main(int argc, char *argv[])
{
    //check three command-line arguments
    if (argc != 4)
    {
        printf("Usage: ./resize n infile outfile\n");
        return 1;
    }

    //make sure the multiplicity is positive and less than or equal to 100
    int n = atoi(argv[1]);
    if (n <=0 || n > 100)
    {
        printf("Usage: ./resize n infile outfile\n");
        return 1;
    }

    //in-file and out-file name
    char *infile = argv[2];
    char *outfile = argv[3];

    //open input file
    FILE *inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        printf("Could not open %s.\n", infile);
        return 2;
    }

    //open output file
    FILE *outptr = fopen(outfile, "w");
    if (outptr == NULL)
    {
        printf("Could not open %s.\n", outfile);
        return 3;
    }

    //read infile's BITMAPFILEHEADER
    BITMAPFILEHEADER bf;
    fread(&bf, sizeof(BITMAPFILEHEADER), 1, inptr);

    //read infile's BITMAPINFOHEADER
    BITMAPINFOHEADER bi;
    fread(&bi, sizeof(BITMAPINFOHEADER), 1, inptr);

    //make sure infile is a 24-bit uncompressed BMP 4.0
    if (bf.bfType != 0x4d42 || bf.bfOffBits != 54 || bi.biSize != 40 ||
        bi.biBitCount != 24 || bi.biCompression != 0)
    {
        fclose(outptr);
        fclose(inptr);
        printf("Unsupported file format.\n");
        return 4;
    }

    //create outfile's header info
    BITMAPFILEHEADER outbf = bf;
    BITMAPINFOHEADER outbi = bi;
    outbi.biWidth *= n;
    outbi.biHeight *=n;
    int in_padding = (4 - (bi.biWidth * sizeof(RGBTRIPLE)) %4) %4;
    int out_padding = (4 - (outbi.biWidth * sizeof(RGBTRIPLE)) %4) %4;
    outbi.biSizeImage = ((sizeof(RGBTRIPLE) * outbi.biWidth) + out_padding) * abs(outbi.biHeight);
    outbf.bfSize = outbi.biSizeImage + 54;
    fwrite(&outbf, sizeof(BITMAPFILEHEADER), 1, outptr);
    fwrite(&outbi, sizeof(BITMAPINFOHEADER), 1, outptr);
    //printf("%i", bi.biWidth);



    for (int i = 0, biHeight = abs(bi.biHeight); i < biHeight; i++)
    {
        //resizing vertically
        for (int rs_v = 0; rs_v < n; rs_v++)
        {
            //point to the begining of line with offset = 54 + width in bytes*
            fseek(inptr, 54 + (bi.biWidth*3 + in_padding) * i, SEEK_SET);
            for (int j = 0; j < bi.biWidth; j++)
            {
                RGBTRIPLE triple;
                fread(&triple, sizeof(RGBTRIPLE), 1, inptr);

                //resizing horizontally
                for (int rs_h = 0; rs_h < n; rs_h++)
                {
                    fwrite(&triple, sizeof(RGBTRIPLE), 1, outptr);
                }
            }
            for (int p = 0; p < out_padding; p++)
            {
                fputc(0x00, outptr);
            }
        }
    }

    // close infile
    fclose(inptr);

    // close outfile
    fclose(outptr);

    return 0;
}