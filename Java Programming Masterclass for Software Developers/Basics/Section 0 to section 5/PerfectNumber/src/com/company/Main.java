package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        System.out.println(isPerfectNumber(224));
    }

    public static boolean isPerfectNumber(int number) {
        if (number < 1)
            return false;

        int sumDivisors = 0;
        for (int i = 1; i < number; i++) {
            if (number % i == 0) {
                sumDivisors += i;
            }
        }
        if (sumDivisors == number)
            return true;
        else
            return false;
    }
}
