package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        numberToWords(234);
        System.out.println(reverse(-2));
    }

    public static void numberToWords(int number) {
        if (number < 0)
            System.out.println("Invalid Value");

        int reversedNumber = reverse(number);
        for (int i = 1; i <= getDigitCount(number); i++) {
            String word = "Zero";
            if (reversedNumber > 0) {
                int digit = reversedNumber % 10;
                switch (digit) {
                    case 0:
                        word = "Zero";
                        break;
                    case 1:
                        word = "One";
                        break;
                    case 2:
                        word = "Two";
                        break;
                    case 3:
                        word = "Three";
                        break;
                    case 4:
                        word = "Four";
                        break;
                    case 5:
                        word = "Five";
                        break;
                    case 6:
                        word = "Six";
                        break;
                    case 7:
                        word = "Seven";
                        break;
                    case 8:
                        word = "Eight";
                        break;
                    case 9:
                        word = "Nine";
                        break;
                }
            } else {
                word = "Zero";
            }
            reversedNumber /= 10;
            System.out.println(word);
        }
    }

    public static int reverse(int number) {
        int reversedNumber = 0;
        int tempNumber = Math.abs(number);
        while (tempNumber > 0) {
            int digit = tempNumber % 10;
            reversedNumber = reversedNumber * 10 + digit;
            tempNumber /= 10;
        }
        if (number >= 0)
            return reversedNumber;
        else
            return reversedNumber * (-1);
    }

    public static int getDigitCount(int number) {
        if (number < 0)
            return -1;

        int count = 0;
        do {
            count++;
            number /= 10;
        }
        while (number > 0);

        return count;
    }
}
