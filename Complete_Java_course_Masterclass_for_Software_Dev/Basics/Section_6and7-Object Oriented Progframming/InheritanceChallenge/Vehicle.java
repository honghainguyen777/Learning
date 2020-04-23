package com.company;

public class Vehicle {
    private String name, size;
    private int currentVelocity, getCurrentDirection;

    public Vehicle(String name, String size) {
        this.name = name;
        this.size = size;

        this.currentVelocity = 0;
        this.getCurrentDirection = 0;
    }

    public void steer(int direction) {
        this.getCurrentDirection += direction;
        System.out.println("Vehicle.steer(): Steering at " + getCurrentDirection + " degrees.");
    }

    public void move(int velocity, int direction) {
        currentVelocity = velocity;
        getCurrentDirection = direction;
        System.out.println("Vehicle.move(): Moving at " + currentVelocity + " in direction " + getCurrentDirection);
    }


    public String getName() {
        return name;
    }

    public String getSize() {
        return size;
    }

    public int getCurrentVelocity() {
        return currentVelocity;
    }

    public int getGetCurrentDirection() {
        return getCurrentDirection;
    }

    public void stop() {
        this.currentVelocity = 0;
    }
}
