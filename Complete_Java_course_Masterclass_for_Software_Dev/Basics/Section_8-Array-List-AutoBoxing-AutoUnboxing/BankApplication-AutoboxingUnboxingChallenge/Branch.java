package com.company;

import java.util.ArrayList;

public class Branch {
    private String branchName;
    private ArrayList<Customer> customerArrayList = new ArrayList<>();

    public Branch(String branchName) {
        this.branchName = branchName;
    }

    public String getBranchName() {
        return branchName;
    }

    public void addNewCustomer(String customerName, double initialAmount) {
        if (getIndexOfCustomer(customerName) >= 0) {
            System.out.println("Customer named \"" + customerName + "\" already exists.");
        } else {
            Customer newCustomer = new Customer(customerName, initialAmount);
            customerArrayList.add(newCustomer);
            System.out.println("New customer named \"" + customerName + "\" is created successfully.");
        }
    }

    public void addNewCustomer(Customer customer) {
        if (getIndexOfCustomer(customer.getName()) >= 0) {
            System.out.println("Customer named \"" + customer.getName() + "\" already exists.");
        } else {
            customerArrayList.add(customer);
        }
    }

    public void depositWithdraw(String customerName, double amount) {
        int indexOfCustomer = getIndexOfCustomer(customerName);
        if (indexOfCustomer >= 0) {
            Customer currentCustomer = customerArrayList.get(indexOfCustomer);
            currentCustomer.newTransaction(amount);
            customerArrayList.set(indexOfCustomer, currentCustomer);
        } else {
            System.out.println("Customer \"" + customerName + "\" does not exists.");
        }
    }

    public void printCustomers() {
        for (int i = 0; i < customerArrayList.size(); i++) {
            System.out.println((i + 1) + ". Customer \"" + customerArrayList.get(i).getName() +
                    "\" has a balance of " + customerArrayList.get(i).getBalance() + "$");
        }
    }

    public void printAccountBalance(String customerName) {
        int indexOfCustomer = getIndexOfCustomer(customerName);
        if (indexOfCustomer >= 0) {
            System.out.println("Customer \"" + customerName + "\" has an account balance of "
                    + customerArrayList.get(indexOfCustomer).getBalance() + "$");
        }
    }

    public void printTransactionHistory(String customerName) {
        int indexOfCustomer = getIndexOfCustomer(customerName);
        if (indexOfCustomer >= 0) {
            customerArrayList.get(indexOfCustomer).printTransactions();
        } else {
            System.out.println("Customer \"" + customerName + "\" does not exists.");
        }
    }

    public int getIndexOfCustomer(String customerName) {
        for (int i = 0; i < customerArrayList.size(); i++) {
            if (customerArrayList.get(i).getName().equals(customerName)) {
                return i;
            }
        }
        return -1;
    }
}
