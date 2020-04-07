package com.company;

public class Main {

    public static void main(String[] args) {
        System.out.println(areEqualByThreeDecimalPlaces(-3.123, 3.123));
    }
    public static boolean areEqualByThreeDecimalPlaces(double num1, double num2) {
        int intNum1Mul1000 = (int) (num1 * 1000);
        int intNum2Mul1000 = (int) (num2 * 1000);
        if (intNum1Mul1000 == intNum2Mul1000) {
            return true;
        } else {
            return false;
        }
    }
}
