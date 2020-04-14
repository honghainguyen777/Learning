package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        printSquareStar(5);
    }

    public static void printSquareStar(int num) {
        if (num < 5)
            System.out.println("Invalid Value");
        else {
            for (int i = 1; i <= num; i++) {
                for (int j = 1; j <= num; j++) {
                    if ((i == 1 || i == num) || (j == 1 || j == num) ||
                            (i == j) || (i == num - j + 1)) {
                        System.out.print("*");
                    } else {
                        System.out.print(" ");
                    }
                }
                System.out.println();
            }
        }
    }
}
