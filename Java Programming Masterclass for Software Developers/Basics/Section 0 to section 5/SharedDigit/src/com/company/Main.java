package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        System.out.println(hasSharedDigit(12, 13));
    }

    public static boolean hasSharedDigit(int number1, int number2) {
        if (number1 < 10 || number1 > 99 || number2 < 10 || number2 > 99) {
            return false;
        }

        boolean sharedDigit = false;
        while (number1 > 0) {
            int digitInNumber1 = number1 % 10;
            int tempNumber2 = number2;
            while (tempNumber2 > 0) {
                int digitInNumber2 = tempNumber2 % 10;
                if (digitInNumber1 == digitInNumber2) {
                    sharedDigit = true;
                }
                tempNumber2 /= 10;
            }
            number1 /= 10;
        }
        return sharedDigit;
    }
}
