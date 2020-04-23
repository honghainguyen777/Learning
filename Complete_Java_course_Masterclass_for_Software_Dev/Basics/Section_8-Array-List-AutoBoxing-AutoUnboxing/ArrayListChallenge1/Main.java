package com.company;

import java.util.Scanner;

public class Main {

    private static Scanner scanner = new Scanner(System.in);
    private static MobilePhone contactList = new MobilePhone();

    public static void main(String[] args) {
        // Create a program that implements a simple mobile phone with the following capabilities.
        // Able to store, modify, remove and query contact names.
        // You will want to create a separate class for Contacts (name and phone number).
        // Create a master class (MobilePhone) that holds the ArrayList of Contacts
        // The MobilePhone class has the functionality listed above.
        // Add a menu of options that are available.
        // Options:  Quit, print list of contacts, add new contact, update existing contact, remove contact
        // and search/find contact.
        // When adding or updating be sure to check if the contact already exists (use name)
        // Be sure not to expose the inner workings of the Arraylist to MobilePhone
        // e.g. no ints, no .get(i) etc
        // MobilePhone should do everything with Contact objects only.
        boolean quit = false;
        int choice = 0;

        printMenu();
        while (!quit) {
            System.out.println("Enter your choice:");
            choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 0:
                    printMenu();
                    break;
                case 1:
                    contactList.printListOfContacts();
                    break;
                case 2:
                    addContact();
                    break;
                case 3:
                    modifyContact();
                    break;
                case 4:
                    removeContact();
                    break;
                case 5:
                    queryContactName();
                    break;
                case 6:
                    queryContactNumber();
                    break;
                case 7:
                    quit = true;
                    break;
            }
        }

    }

    public static void printMenu() {
        System.out.println("Select menu by pressing:");
        System.out.println("0 - To selection menu");
        System.out.println("1 - To print the list of contacts");
        System.out.println("2 - To add a new contact");
        System.out.println("3 - To modify an existing contact");
        System.out.println("4 - To remove an existing contact");
        System.out.println("5 - To search for an existing contact by name");
        System.out.println("6 - To search for an existing contact by number");
        System.out.println("7 - To quit the application");
    }

    public static void addContact() {
        System.out.println("Please enter contact name:");
        String name = scanner.nextLine();
        System.out.println("Please enter contact Number:");
        String number = scanner.nextLine();
        Contact newContact = new Contact(name, number);
        contactList.addContact(newContact);
    }

    public static void modifyContact() {
        System.out.println("Please enter contact name:");
        String name = scanner.nextLine();
        System.out.println("Please enter new name for the contact:");
        String newName = scanner.nextLine();
        System.out.println("Please enter new number for the contact:");
        String newNumber = scanner.nextLine();
        Contact newContact = new Contact(newName, newNumber);
        contactList.modifyContact(name, newContact);
    }

    public static void removeContact() {
        System.out.println("Please enter the name you want to remove:");
        String name = scanner.nextLine();
        contactList.removeContact(name);
    }

    public static void queryContactName() {
        System.out.println("Please enter a name:");
        String name = scanner.nextLine();
        contactList.queryContactName(name);
    }

    public static void queryContactNumber() {
        System.out.println("Please enter a number:");
        String number = scanner.nextLine();
        contactList.queryContactNumber(number);
    }
}
