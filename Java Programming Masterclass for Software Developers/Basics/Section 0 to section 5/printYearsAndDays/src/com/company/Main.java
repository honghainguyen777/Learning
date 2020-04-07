package com.company;

public class Main {

    public static void main(String[] args) {
        printYearsAndDays(561600);
    }
    public static void printYearsAndDays(long minutes) {
        if (minutes < 0) {
            System.out.println("Invalid Value");
        } else {
            long years = minutes / (365 * 24 * 60);
            long days = (minutes % (365 * 24 * 60)) / (60 * 24);
            System.out.println(minutes + " min = " + years + " y and " + days + " d");
        }
    }
}
