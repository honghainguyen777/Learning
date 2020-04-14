package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        System.out.println(canPack(1,0,4));

    }

    public static boolean canPack(int bigCount, int smallCount, int goal) {
        boolean checkPack = false;

        if (bigCount*5 + smallCount >= goal &&
                (bigCount >= 0 || smallCount >= 0 || goal >= 0)) {
            for (int i = 0; i <= bigCount; i++) {
                for (int j = 0; j <= smallCount; j++) {
                    if (i * 5 + j == goal) {
                        checkPack = true;
                    }
                }

            }
        }
        return checkPack;
    }
}
