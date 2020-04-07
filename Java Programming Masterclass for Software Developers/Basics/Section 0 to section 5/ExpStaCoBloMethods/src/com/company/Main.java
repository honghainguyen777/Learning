package com.company;

public class Main {

    public static void main(String[] args) {
        String name = "A";
        int score = calculateHighScorePosition(1500);
	    displayHighScorePosition(name, score);

	    name = "B";
        score = calculateHighScorePosition(900);
        displayHighScorePosition(name, score);

        name = "C";
        score = calculateHighScorePosition(400);
        displayHighScorePosition(name, score);

        name = "D";
        score = calculateHighScorePosition(50);
        displayHighScorePosition(name, score);
    }
    public static void displayHighScorePosition(String playerName, int position) {
        System.out.println(playerName + " managed to get into position " + position +
                " on the high score table");
    }
    public static int calculateHighScorePosition(int playerScore) {
        if (playerScore >= 1000)
            return 1;
        else if (playerScore >= 500 && playerScore < 1000)
            return 2;
        else if (playerScore >= 100 && playerScore < 500)
            return 3;
        else
            return 4;
    }
}
