package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
	// write your code here
        Scanner scanner = new Scanner(System.in);
        int min = 0;
        int max = 0;
        // int max = Integer.MAX_VALUE;
        // int min = Integer.MIN_VALUE;
        boolean first = true;
        while (true) {
            System.out.println("Enter number:");
            boolean hasInt = scanner.hasNextInt();
            if (hasInt) {
                int number = scanner.nextInt();

                if (first) {
                    first = false;
                    min = number;
                    max = number;
                }

                if (number < min)
                    min = number;
                else if (number > max) {
                    max = number;
                }
            } else {
                break;
            }
            scanner.nextLine();
        }
        System.out.println("The maximum number is: " + max);
        System.out.println("The minimum number is: " + min);
        scanner.close();
    }
}
