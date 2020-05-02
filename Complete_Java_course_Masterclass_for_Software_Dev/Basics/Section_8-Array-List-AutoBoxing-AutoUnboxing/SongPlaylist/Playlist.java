package com.company;

import java.util.Iterator;
import java.util.LinkedList;

public class Playlist {
    private String playlistName;
    private LinkedList<String> playlist;

    public Playlist(String playlistName) {
        this.playlistName = playlistName;
        this.playlist = new LinkedList<>();
    }

    public LinkedList<String> getPlaylist() {
        return playlist;
    }

    public void addSong(String songName, boolean existInAlbum) {
        if (existInAlbum) {
            if (checkSong(songName)) {
                System.out.println("\"" + songName + "\" already exists in the playlist");
            } else {
                playlist.add(songName);
                System.out.println("\"" + songName + "\" is added to the playlist");
            }
        } else {
            System.out.println("\"" + songName + "\" does not exist in any albums");
        }
    }

    public void printPlayList() {
        for (int i = 0; i < playlist.size(); i++) {
            System.out.println("Songs in the playlist:");
            System.out.println((i + 1) + ". " + playlist.get(i));
        }
    }

    private boolean checkSong(String songName) {
        Iterator<String> i = playlist.iterator();
        while (i.hasNext()) {
            if (i.next().equals(songName)) {
                return true;
            }
        }
        return false;
    }
}
