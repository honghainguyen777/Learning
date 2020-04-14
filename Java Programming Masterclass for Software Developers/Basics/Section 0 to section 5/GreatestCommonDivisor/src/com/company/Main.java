package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        System.out.println(getGreatestCommonDivisor(81, 153));
    }

    public static int getGreatestCommonDivisor(int first, int second) {
        if (first < 10 || second < 10)
            return -1;

        int greatestCommonDivisor = 1;
        for (int i = 1; i <= first; i++) {
            if (first % i == 0) {
                for (int j = 1; j <= second; j++) {
                    if (second % j == 0) {
                        if (i == j && i > greatestCommonDivisor)
                            greatestCommonDivisor = i;
                    }
                }
            }
        }
        return greatestCommonDivisor;
    }
}
