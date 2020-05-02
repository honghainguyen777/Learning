package com.company;

import java.util.ArrayList;

public class Album {
    private String albumName;
    private ArrayList<Song> songList;

    public Album(String albumName) {
        this.albumName = albumName;
        this.songList = new ArrayList<>();
    }

    public String getAlbumName() {
        return albumName;
    }

    public void addSong(String songName, int duration) {
        Song song = new Song(songName, duration);
        if (!checkSong(songName)) {
            songList.add(song);
            System.out.println("\"" + songName + "\" is added successfully in the \"" + albumName +
                    "\" album");
        } else {
            System.out.println("\"" + songName + "\" already exists in the \"" + albumName +
                    "\" album");
        }
    }

    public void printSongList() {
        System.out.println("Songs in the \"" + albumName + "\" album:");
        for (int i = 0; i < songList.size(); i++) {
            System.out.println((i + 1) + ". " + songList.get(i).getTitle() +
                    "(" + songList.get(i).getDuration() + "s)");
        }
    }

    public boolean checkSong(String songName) {
        for (int i = 0; i < songList.size(); i++) {
            if (songList.get(i).getTitle().equals(songName)) {
                return true;
            }
        }
        return false;
    }
}
