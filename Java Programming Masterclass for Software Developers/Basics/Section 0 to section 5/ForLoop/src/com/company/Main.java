package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        int sum = 0;
        int count = 0;
        for (int i = 1; i <= 1000; i++) {
            if (i % 3 == 0 && i % 5 == 0) {
                count ++;
                if (count <=5 ) {
                    System.out.println(i);
                    sum += i;
                } else {
                    break;
                }
            }
        }
        System.out.println(sum);
    }
}
