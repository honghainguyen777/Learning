package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        // Create a program using arrays that sorts a list of integers in descending order.
        // Descending order is highest value to lowest.
        // In other words if the array had the values in it 106, 26, 81, 5, 15 your program should
        // ultimately have an array with 106,81,26, 15, 5 in it.
        // Set up the program so that the numbers to sort are read in from the keyboard.
        // Implement the following methods - getIntegers, printArray, and sortIntegers
        // getIntegers returns an array of entered integers from keyboard
        // printArray prints out the contents of the array
        // and sortIntegers should sort the array and return a new array containing the sorted numbers
        // you will have to figure out how to copy the array elements from the passed array into a new
        // array and sort them and return the new sorted array.

        int[] anArray = getIntegers(10);
        printArray(anArray);
        System.out.println("This is the sorted Array:");
        int[] sortedArray = sortInteger(anArray);
        printArray(sortedArray);

    }

    public static int[] getIntegers(int size) {
        int[] anIntArray = new int[size];
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a series of integers:");
        int count = 0;
        while (count < size) {
            boolean hasNextIn = scanner.hasNextInt();
            if (hasNextIn) {
                int number = scanner.nextInt();
                anIntArray[count] = number;
                count++;
            } else {
                break;
            }
            scanner.nextLine();
        }
        return anIntArray;
    }


    public static void printArray(int[] anArray) {
        for (int i = 0; i < anArray.length; i++) {
            System.out.println("Element " + i + " has a value of " + anArray[i]);
        }
    }

    public static int[] sortInteger(int[] anArray) {
        int[] sortedArray = anArray;
        int count = 0;
        for (int i = 1; i < anArray.length; i++) {
            if (sortedArray[i] > sortedArray[i - 1]) {
                int temp = sortedArray[i-1];
                sortedArray[i-1] = anArray[i];
                sortedArray[i] = temp;
                count ++;
            }
        }
        if (count == 0) {
            return sortedArray;
        } else {
            return sortInteger(sortedArray);
        }
    }

    /*
    public static int[] sortInteger(int[] anArray) {
        int[] sortedArray = new int[anArray.length];
        for (int i = 0; i < anArray.length; i++) {
            sortedArray[i] = anArray[i];
        }

        boolean flag = true;
        int temp;
        while (flag) {
            flag = false;
            for (int i = 0; i < sortedArray.length - 1; i++) {
                temp = sortedArray[i];
                sortedArray[i] = sortedArray[i+1];
                sortedArray[i+1] = temp;
                flag = true;
            }
        }
        return sortedArray;
    }
     */
}
