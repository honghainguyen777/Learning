#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    //check one command-line argument
    if (argc != 2)
    {
        printf("Usage: ./recover image\n");
        return 1;
    }

    //open card file
    char *infile = argv[1];
    FILE *inptr = fopen(infile,"r");
    if (inptr == NULL)
    {
        printf("Could not open the %s card.\n", infile);
        return 2;
    }

    //create outfile
    FILE *outptr = NULL;
    //creat buffer
    unsigned char buffer[512];
    int count = 0;

    //make space for found image
    char image[8];

    //reading file to find the JPEGs
    while (fread(buffer, 512, 1, inptr))
    {
        //check if the block begining with JPEG header
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            //close previous JPEG files
            if (count > 0)
            {
                fclose(outptr);
            }

            //create name for count-th image
            sprintf(image, "%03i.jpg", count);

            //open count-th image
            outptr = fopen(image,"w");
            count++;
            //Start a new JPEG?
            if (outptr == NULL)
            {
                printf("Could not create a JPEG file named %s.\n", image);
                return 3;
            }

        }
        //already found a JPEG?
        if (outptr != NULL)
        {
            fwrite(&buffer, 512, 1, outptr);
        }
    }
    fclose(inptr);
    fclose(outptr);
    return 0;
}
