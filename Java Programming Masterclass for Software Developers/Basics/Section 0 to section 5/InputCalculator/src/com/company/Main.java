package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
	// write your code here
        inputThenPrintSumAndAverage();
    }

    public static void inputThenPrintSumAndAverage() {
        int sum = 0;
        int count = 0;
        Scanner scanner = new Scanner(System.in);
        while (true) {
            boolean isAnInt = scanner.hasNextInt();
            if (isAnInt) {
                int number = scanner.nextInt();
                sum += number;
                count ++;
            } else {
                break;
            }
            scanner.nextLine();
        }
        scanner.close();
        long average = 0;
        if (count != 0) {
            average = Math.round((double) sum / count);
        }
        System.out.println("SUM = " + sum + " AVG = " + average);
    }
}
