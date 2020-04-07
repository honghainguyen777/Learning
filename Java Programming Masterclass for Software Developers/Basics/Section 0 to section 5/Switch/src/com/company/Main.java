package com.company;

public class Main {

    public static void main(String[] args) {
        System.out.println(getDaysInMonth(2, 2000));
        System.out.println(getDaysInMonth(2, 2001));
        System.out.println(getDaysInMonth(3, 2000));
    }

    public static boolean isLeapYear(int year) {
        if (year < 1 || year > 9999) {
            return false;
        }
        boolean leapYear = false;
        if (year % 4 == 0) {
            if (year % 100 != 0) {
                leapYear = true;
            } else {
                if (year % 400 == 0)
                    leapYear = true;
            }
        }
        return leapYear;
    }

    public static int getDaysInMonth(int month, int year) {
        if (month < 1 || month > 12 || year < 1 || year > 9999)
            return -1;

        switch (month) {
            case 4: case 6: case 9: case 11:
                return 30;
            case 2:
                if (isLeapYear(year))
                    return 29;
                else
                    return 28;
            default:
                return 31;
        }
    }
}
