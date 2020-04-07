package com.company;

public class Main {

    public static void main(String[] args) {
        System.out.println(isCatPlaying(false, 35));
    }
    public static boolean isCatPlaying(boolean summer, int temperature) {
        boolean playing = false;
        if (summer == true) {
            if (temperature >= 25 && temperature <= 45) {
                playing = true;
            }

        } else {
            if (temperature >= 25 && temperature <= 35) {
                playing = true;
            }
        }
        return playing;
    }
}
