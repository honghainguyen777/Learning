package com.company;

import java.util.ArrayList;

public class Main {

    public static void main(String[] args) {
	// write your code here
        ArrayList<Integer> intArrayList = new ArrayList<>();
        intArrayList.add(Integer.valueOf(54));
        System.out.println(intArrayList.get(0).intValue());
        ArrayList<Double> doubleArrayList = new ArrayList<>();
        ArrayList<Long> longArrayList = new ArrayList<>();

        for (double dbl = 0.0; dbl <= 10; dbl += 0.5) {
            doubleArrayList.add(dbl);
            // equal: doubleArrayList.add(Integer.valueOf(dbl));
        }

        for (int i = 0; i < doubleArrayList.size(); i++) {
            double value = doubleArrayList.get(i);
            // equal: doubleArrayList.get(i).doubleValue();
            System.out.println(value);

        }
    }
}
