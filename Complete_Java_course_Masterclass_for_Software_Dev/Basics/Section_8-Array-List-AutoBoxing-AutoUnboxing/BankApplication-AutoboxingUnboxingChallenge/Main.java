package com.company;

import java.util.Scanner;

public class Main {
    private static Bank bank = new Bank("PostBank");
    public static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        // You job is to create a simple banking application.
        // There should be a Bank class
        // It should have an arraylist of Branches
        // Each Branch should have an arraylist of Customers
        // The Customer class should have an arraylist of Doubles (transactions)
        // Customer:
        // Name, and the ArrayList of doubles.
        // Branch:
        // Need to be able to add a new customer and initial transaction amount.
        // Also needs to add additional transactions for that customer/branch
        // Bank:
        // Add a new branch
        // Add a customer to that branch with initial transaction
        // Add a transaction for an existing customer for that branch
        // Show a list of customers for a particular branch and optionally a list
        // of their transactions
        // Demonstration autoboxing and unboxing in your code
        // Hint: Transactions
        // Add data validation.
        // e.g. check if exists, or does not exist, etc.
        // Think about where you are adding the code to perform certain actions
        printMenu();
        boolean quit = false;
        while (!quit) {
            System.out.println("Please enter your chosen option:");
            int option = scanner.nextInt();
            scanner.nextLine();
            switch (option) {
                case 0:
                    printMenu();
                    break;
                case 1:
                    addNewBranch();
                    break;
                case 2:
                    addNewCustomer();
                    break;
                case 3:
                    deposit();
                    break;
                case 4:
                    withdraw();
                    break;
                case 5:
                    printBranches();
                    break;
                case 6:
                    printCustomerInfo();
                    break;
                case 7:
                    printCustomerBalance();
                    break;
                case 8:
                    printCustomerTransactions();
                    break;
                case 9:
                    quit = true;
                    break;
            }
        }
    }

    private static void printMenu() {
        System.out.println("List of available options: ");
        System.out.println("0 - To the main menu");
        System.out.println("1 - To add a new branch");
        System.out.println("2 - To add a new customer");
        System.out.println("3 - To deposit money to customer's account");
        System.out.println("4 - To withdraw money from customer's account");
        System.out.println("5 - To see the available branches");
        System.out.println("6 - To see existing customers and their balances in a branch");
        System.out.println("7 - To see customer's current balance");
        System.out.println("8 - To see customer's transaction history");
        System.out.println("9 - To quit the application");
    }

    public static void addNewBranch() {
        System.out.println("To add a new branch, please enter a desire name:");
        String newBranchName = scanner.nextLine();
        bank.addNewBranch(newBranchName);
    }

    public static void addNewCustomer() {
        System.out.println("Please firstly enter the branch's name where you want to add a new customer");
        String branchName = scanner.nextLine();
        if (bank.getIndexOfBranch(branchName) >= 0) {
            System.out.println("Now, please enter the customer name:");
            String newCustomerName = scanner.nextLine();
            System.out.println("Please enter the initial amount for the account:");
            double amount = scanner.nextDouble();
            Customer customer = new Customer(newCustomerName, amount);
            bank.addNewCustomer(branchName, customer);
        } else {
            System.out.println("The \"" + branchName + "\" does not exists.");
        }
    }

    public static void deposit() {
        System.out.println("Please firstly enter the customer branch's name");
        String branchName = scanner.nextLine();
        System.out.println("Now, please enter the customer name:");
        String customerName = scanner.nextLine();
        System.out.println("Please enter the deposit amount for the account:");
        double amount = scanner.nextDouble();
        bank.depositWithdraw(branchName, customerName, amount);
    }

    public static void withdraw() {
        System.out.println("Please firstly enter the customer branch's name");
        String branchName = scanner.nextLine();
        System.out.println("Now, please enter the customer name:");
        String customerName = scanner.nextLine();
        System.out.println("Please enter the withdrawn amount for the account:");
        double amount = scanner.nextDouble();
        bank.depositWithdraw(branchName, customerName, -amount);
    }

    public static void printBranches() {
        System.out.println("This is the list of all branches");
        bank.printBranchList();
    }

    public static void printCustomerInfo() {
        System.out.println("Please enter the branch name:");
        String branchName = scanner.nextLine();
        bank.printAllCustomerInfo(branchName);
    }

    public static void printCustomerBalance() {
        System.out.println("Please firstly enter the customer branch's name");
        String branchName = scanner.nextLine();
        System.out.println("Now, please enter the customer name:");
        String customerName = scanner.nextLine();
        bank.printCustomerBalance(branchName, customerName);
    }

    public static void printCustomerTransactions() {
        System.out.println("Please firstly enter the customer branch's name");
        String branchName = scanner.nextLine();
        System.out.println("Now, please enter the customer name:");
        String customerName = scanner.nextLine();
        bank.printCustomerTransactions(branchName, customerName);
    }
}
