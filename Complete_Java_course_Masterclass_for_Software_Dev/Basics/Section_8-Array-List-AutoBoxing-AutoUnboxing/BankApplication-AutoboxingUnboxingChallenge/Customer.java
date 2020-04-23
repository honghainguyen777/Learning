package com.company;

import java.util.ArrayList;

public class Customer {
    private String name;
    private ArrayList<Double> transactionArrayList = new ArrayList<>();
    private double balance;

    public Customer(String name, double initialAmount) {
        this.name = name;
        this.balance = initialAmount;
        this.transactionArrayList.add(initialAmount);
    }

    public String getName() {
        return name;
    }

    public double getBalance() {
        return balance;
    }

    public void newTransaction(double amount) {
        if (amount >= 0) {
            this.balance += amount;
            transactionArrayList.add(amount);
            System.out.println("You have deposited " + amount + "$ to your account. Your new balance is " + balance);
        } else {
            if (balance + amount < 0) {
                System.out.println("You dont have enough money. Your current balance is " + balance + "$");
            } else {
                this.balance += amount;
                transactionArrayList.add(amount);
                System.out.println("Your withdraw is successful. Your current balance is " + balance + "$");
            }
        }
    }

    public void printTransactions() {
        for (int i = 0; i < transactionArrayList.size(); i++) {
            System.out.println("Transaction " + (i + 1) + ": " + transactionArrayList.get(i));
        }
    }
}
