package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        System.out.println(getLargestPrime(2));
    }

    public static int getLargestPrime(int num) {
        if (num <= 1)
            return -1;

        int largestPrimeN = -1;
        for (int i = 2; i <= num; i++) {
            if (num % i == 0) {
                boolean isPrime = true;
                for (int j = 2; j < i; j++) {
                    if (i % j == 0) {
                        isPrime = false;
                    }
                }
                if (isPrime && i > largestPrimeN) {
                    largestPrimeN = i;
                }
            }
        }
        return largestPrimeN;
    }
}
