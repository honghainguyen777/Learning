package com.company;

public class Main {

    public static void main(String[] args) {
	    int myValue = 1000;

	    int myMinIntValue = Integer.MIN_VALUE;
	    int myMaxIntValue = Integer.MAX_VALUE;
        System.out.println("Integer maximum value =" + myMaxIntValue);
        System.out.println("Integer minimum value =" + myMinIntValue);

        byte aByteNumber = 100;
        short aShortNumber = 1000;
        int anIntNumber = 1232;
        long aLongNumber = 50000L + 10L * (aByteNumber +
                aShortNumber + anIntNumber);
        System.out.println(aLongNumber);


    }
}
