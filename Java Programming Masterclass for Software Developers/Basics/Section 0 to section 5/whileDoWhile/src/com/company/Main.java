package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        int number = 4;
        int finishNumber = 20;
        int totNum = 0;
        while (number <= finishNumber) {
            number ++;
            if (!isEvenNumber(number)) {
                continue;
            }
            System.out.println("Even number " + number);
            totNum ++;
            if (totNum == 5)
                break;
        }
        System.out.println(totNum);
    }

    public static boolean isEvenNumber(int num) {
        if (num % 2 == 0) {
            return true;
        } else {
            return false;
        }
    }
}
