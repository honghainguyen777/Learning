package com.company;

import java.util.*;

public class Main {

    private static LinkedList<Album> albums = new LinkedList<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        // Create a program that implements a playlist for songs
        // Create a Song class having Title and Duration for a song.
        // The program will have an Album class containing a list of songs.
        // The albums will be stored in an ArrayList
        // Songs from different albums can be added to the playlist and will appear in the list in the order
        // they are added.
        // Once the songs have been added to the playlist, create a menu of options to:-
        // Quit,Skip forward to the next song, skip backwards to a previous song.  Replay the current song.
        // List the songs in the playlist
        // A song must exist in an album before it can be added to the playlist (so you can only play songs that
        // you own).
        // Hint:  To replay a song, consider what happened when we went back and forth from a city before we
        // started tracking the direction we were going.
        // As an optional extra, provide an option to remove the current song from the playlist
        // (hint: listiterator.remove()


        Album album1 = new Album("Love Yourself");
        album1.addSong("Truth Hurts", 181);
        album1.addSong("Good Thing", 284);
        album1.addSong("Love You To Love Me", 207);
        albums.add(album1);

        Album album2 = new Album("Wedding Songs");
        album2.addSong("Better Today", 253);
        album2.addSong("You're Beautiful", 203);
        album2.addSong("25 minutes", 263);
        album2.addSong("Marry Me", 246);
        albums.add(album2);

        Playlist playlist = new Playlist("Love songs");
        playlist.addSong("Good Thing", checkSong("Good Thing"));
        playlist.addSong("You're Beautiful", checkSong("You're Beautiful"));
        playlist.addSong("Good Thing", checkSong("Good Thing"));
        playlist.addSong("25 minutes", checkSong("25 minutes"));
        playlist.addSong("A song", checkSong("A song"));
        playlist.addSong("Marry Me", checkSong("Marry Me"));

        boolean quit = false;
        boolean next = true;
        ListIterator<String> listIterator = playlist.getPlaylist().listIterator();
        if (playlist.getPlaylist().isEmpty()) {
            System.out.println("No songs in the playlist");
            quit = true;
        } else {
            printMenu();
        }

        while (!quit) {
            System.out.println("Please enter your option:");
            int option = scanner.nextInt();
            switch (option) {
                case 0:
                    printMenu();
                    break;

                case 1:
                    playlist.printPlayList();
                    break;

                case 2:
                    if (!next) {
                        if (listIterator.hasNext()) {
                            listIterator.next();
                        }
                        next = true;
                    }
                    if (listIterator.hasNext()) {
                        System.out.println("Now \"" + listIterator.next() + "\" is playing");
                    } else {
                        System.out.println("Reached the end of the playlist");
                        next = false;
                    }
                    break;

                case 3:
                    if (next) {
                        if (listIterator.hasPrevious()) {
                            listIterator.previous();
                        }
                        next = false;
                    }
                    if (listIterator.hasPrevious()) {
                        System.out.println("Now \"" + listIterator.previous() + "\" is playing");
                    } else {
                        System.out.println("It is the beginning of the playlist");
                        next = true;
                    }
                    break;

                case 4:
                    if (next) {
                        if (listIterator.hasPrevious()) {
                            System.out.println("Replaying the \"" + listIterator.previous() + "\"");
                            next = false;
                        } else {
                            System.out.println("It is the beginning of the playlist");
                        }
                    } else {
                        if (listIterator.hasNext()) {
                            System.out.println("Replaying the \"" + listIterator.next() + "\"");
                            next = true;
                        } else {
                            System.out.println("It is the end of the playlist");
                        }
                    }
                    break;
                case 5:
                    if (playlist.getPlaylist().size() > 0) {
                        listIterator.remove();
                        System.out.println("The song is removed");
                        if (listIterator.hasNext()) {
                            System.out.println("Now playing " + listIterator.next());
                        } else if (listIterator.hasPrevious()) {
                            System.out.println("Now playing " + listIterator.previous());
                        }
                    }
                    break;
                case 6:
                    quit = true;
                    break;
            }
        }
    }

    private static void printMenu() {
        System.out.println("0 - To menu");
        System.out.println("1 - To print the playlist");
        System.out.println("2 - To listen the next song");
        System.out.println("3 - To listen the previous song");
        System.out.println("4 - To listen the current song");
        System.out.println("5 - To remove the current song");
        System.out.println("6 - To quit the music application");
    }

    private static boolean checkSong(String songName) {
        Iterator<Album> i = albums.iterator();
        while (i.hasNext()) {
            if(i.next().checkSong(songName)) {
                return true;
            }
        }

        return false;
    }
}
