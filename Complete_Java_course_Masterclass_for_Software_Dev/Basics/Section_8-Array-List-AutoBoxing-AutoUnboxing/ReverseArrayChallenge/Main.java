package com.company;

import java.util.Arrays;

public class Main {

    public static void main(String[] args) {

        int[] array = {1, 2, 3, 4, 5};
        System.out.println("array = " + Arrays.toString(array));
        reverse(array);
        System.out.println("reversed array = " + Arrays.toString(array));
    }

    public static void reverse(int[] array) {
        int[] reversedArray = new int[array.length];
        for (int i = array.length - 1; i >= 0; i--) {
            reversedArray[array.length - i - 1] = array[i];
        }
        for (int i = 0; i < array.length; i++) {
            array[i] = reversedArray[i];
        }
    }
}
