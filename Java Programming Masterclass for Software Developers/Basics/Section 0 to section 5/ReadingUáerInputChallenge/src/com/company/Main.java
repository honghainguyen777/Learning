package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
	// write your code here
        Scanner scanner = new Scanner(System.in);

        int count = 0;
        while (count < 10) {
            System.out.println("Enter your numbers");
            boolean hasNextInt = scanner.hasNextInt();
            if (hasNextInt) {
                int number = scanner.nextInt();
                count++;
                System.out.println("The input number #" +  count + " is: " + number);
            } else {
                System.out.println("Invalid Number");
            }
            scanner.nextLine();
        }
        scanner.close();
    }
}
