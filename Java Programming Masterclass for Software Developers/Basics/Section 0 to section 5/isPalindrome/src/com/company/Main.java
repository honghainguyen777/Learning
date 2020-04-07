package com.company;

public class Main {

    public static void main(String[] args) {
        System.out.println(isPalindrome(-1221));
    }
    public static boolean isPalindrome(int number) {
        int reversedNumber = 0;
        number = Math.abs(number);
        int originalNumber = number;
        while (number > 0) {
            reversedNumber = reversedNumber * 10  + number % 10;
            number /= 10;
        }
        if (reversedNumber == originalNumber) {
            return true;
        } else {
            return false;
        }
    }
}
