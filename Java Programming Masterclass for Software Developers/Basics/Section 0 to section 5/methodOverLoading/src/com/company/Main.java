package com.company;

public class Main {

    public static void main(String[] args) {
        System.out.println(calcFeetAndInchesToCentimeters(2, 8));
        System.out.println(calcFeetAndInchesToCentimeters(8));
    }
    public static double calcFeetAndInchesToCentimeters(int feet, int inches) {
        if ((feet) >= 0 && (inches >= 0 && inches <= 12)) {
            int totalInches = feet * 12 + inches;
            return (totalInches * 2.54);
        } else
            return -1;
    }
    public static double calcFeetAndInchesToCentimeters(int inches) {
        if (inches >= 0) {
            return (inches / 12d);
        } else
            return -1;
    }
}
