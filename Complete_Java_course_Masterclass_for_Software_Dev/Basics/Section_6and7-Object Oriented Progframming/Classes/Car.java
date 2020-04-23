package com.company;

public class Car {

    private int doors;
    private int wheels;
    private String model;
    private String engine;
    private String color;

    public void setModel(String model) {
        String validModel = model.toLowerCase();
        if (validModel.equals("3.0") || validModel.equals("2.0")) {
            this.model = model;
        } else {
            this.model = "unknown";
        }

    }
    public String getModel() {
        return this.model;
    }
}
