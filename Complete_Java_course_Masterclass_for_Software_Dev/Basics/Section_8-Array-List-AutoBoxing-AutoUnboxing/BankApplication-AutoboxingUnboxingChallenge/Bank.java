package com.company;

import java.util.ArrayList;

public class Bank {
    private String bankName;
    private ArrayList<Branch> branchArrayList = new ArrayList<>();

    public Bank(String bankName) {
        this.bankName = bankName;
    }

    public void addNewBranch(String newBranchName) {
        if (getIndexOfBranch(newBranchName) >= 0) {
            System.out.println("This branch named \"" + newBranchName + "\" already exists.");
        } else {
            Branch newBranch = new Branch(newBranchName);
            branchArrayList.add(newBranch);
            System.out.println("This branch named \"" + newBranchName + "\" added successfully.");
        }
    }


    public void addNewCustomer(String branchName, Customer customer) {
        if (getIndexOfBranch(branchName) >= 0) {
            int i = getIndexOfBranch(branchName);
            if (branchArrayList.get(i).getIndexOfCustomer(customer.getName()) == -1) {
                Branch currentBranch = branchArrayList.get(i);
                currentBranch.addNewCustomer(customer);
                branchArrayList.set(i, currentBranch);
                System.out.println("New customer named " + customer.getName() +
                        "is added successfully to the " + branchName + " branch.");
            } else {
                System.out.println("Customer named \"" + customer.getName() + "\" already exists.");
            }
        } else {
            System.out.println("Branch named " + branchName + " does not exist.");
        }
    }

    public void depositWithdraw(String branchName, String customerName, double amount) {
        if (getIndexOfBranch(branchName) >= 0) {
            int i = getIndexOfBranch(branchName);
            int indexOfCustomerInBranch = branchArrayList.get(i).getIndexOfCustomer(customerName);
            if (indexOfCustomerInBranch >= 0) {
                Branch currentBranch = branchArrayList.get(i);
                currentBranch.depositWithdraw(customerName, amount);
                branchArrayList.set(i, currentBranch);
            }
        } else {
            System.out.println("Branch named " + branchName + " does not exist.");
        }
    }

    public void printBranchList() {
        for (int i = 0; i < branchArrayList.size(); i++) {
            System.out.println((i + 1) + ". " + branchArrayList.get(i).getBranchName());
        }
    }

    public void printAllCustomerInfo(String branchName) {
        int index = getIndexOfBranch(branchName);
        if (index >= 0) {
            branchArrayList.get(index).printCustomers();
        } else {
            System.out.println("Branch named " + branchName + " does not exist.");
        }
    }

    public void printCustomerTransactions(String branchName, String customerName) {
        int index = getIndexOfBranch(branchName);
        if (index >= 0) {
            branchArrayList.get(index).printTransactionHistory(customerName);
        } else {
            System.out.println("Branch named " + branchName + " does not exist.");
        }
    }

    public void printCustomerBalance(String branchName, String customerName) {
        int index = getIndexOfBranch(branchName);
        if (index >= 0) {
            branchArrayList.get(index).printAccountBalance(customerName);
        } else {
            System.out.println("Branch named " + branchName + " does not exist.");
        }
    }

    public int getIndexOfBranch(String branchName) {
        for (int i = 0; i < branchArrayList.size(); i++) {
            if (branchArrayList.get(i).getBranchName().equals(branchName)) {
                return i;
            }
        }
        return -1;
    }
}
