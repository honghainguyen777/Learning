package com.company;

public class Main {

    public static void main(String[] args) {
        System.out.println(hasEqualSum(1, 1, 2));
    }
    public static boolean hasEqualSum(int num1, int num2, int num3) {
        int sumNum1Num2 = num1 + num2;
        if (sumNum1Num2 == num3) {
            return true;
        } else {
            return false;
        }
    }
}
