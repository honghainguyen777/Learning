package com.company;

public class Main {

    public static void main(String[] args) {
        System.out.println(isLeapYear(1924));
    }
    public static boolean isLeapYear(int year) {
        boolean leapYear = false;
        if (year % 4 == 0 && (year >= 1 && year <= 9999)) {
            if (year % 100 == 0) {
                if (year % 400 == 0) {
                    leapYear = true;
                }
            }
            else {
                leapYear = true;
            }
        }
        return leapYear;
    }
}
