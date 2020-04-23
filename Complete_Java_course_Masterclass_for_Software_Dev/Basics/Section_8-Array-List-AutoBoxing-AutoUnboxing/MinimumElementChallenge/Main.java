package com.company;

import java.util.Arrays;
import java.util.Scanner;

public class Main {
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
	// write your code here
        System.out.println("Enter a size of an Array:");
        int size = scanner.nextInt();
        scanner.nextLine();
        int[] anIntArray = readIntegers(size);
        System.out.println("anIntArray = " + Arrays.toString(anIntArray));
        System.out.println("Minimum value is " + findMin(anIntArray));
    }

    public static int[] readIntegers(int size) {
        int[] anIntArray = new int[size];
        System.out.println("Enter an Int array with size of " + size + ":");
        for (int i = 0; i < size; i++) {
            anIntArray[i] = scanner.nextInt();
        }
        return anIntArray;
    }

    public static int findMin(int[] anIntArray) {
        int minValue = anIntArray[0];
        for (int i = 1; i < anIntArray.length; i++) {
            if (anIntArray[i] < minValue) {
                minValue = anIntArray[i];
            }
        }
        return minValue;
    }
}
