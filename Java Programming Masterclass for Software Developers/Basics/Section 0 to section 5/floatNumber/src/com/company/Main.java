package com.company;

public class Main {

    public static void main(String[] args) {
	    double x = 20.00d;
	    double y = 80.00d;
	    double add = (x + y) * 100.00d;
	    double remainder = add % 40.00d;
	    boolean cond = (remainder == 0) ? true : false;
        System.out.println(cond);
        if (!cond) {
            System.out.println("Got some remainder: " + remainder);
        }
    }
}
