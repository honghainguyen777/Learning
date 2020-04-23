package com.company;

import java.util.ArrayList;

public class MobilePhone {
    private ArrayList<Contact> contactList = new ArrayList<>();

    public ArrayList<Contact> getContactList() {
        return contactList;
    }

    public void addContact(Contact contact) {
        if (contactExist(contact.getName())) {
            System.out.println("Contact with name \"" + contact.getName() + "\" already exists");
        } else {
            contactList.add(contact);
        }
    }

    public void modifyContact(String name, Contact modifiedContact) {
        if (getIndex(name) >= 0) {
            if(contactExist(modifiedContact.getName())) {
                System.out.println("Contact with name \"" + modifiedContact.getName() + "\" already exists");
            } else {
                contactList.set(getIndex(name), modifiedContact);
                System.out.println("Contact of " + name + " has been changed.");
            }
        } else {
            System.out.println("Contact of " + name + " does not exist.");
        }
    }

    public void removeContact(String name) {
        if (getIndex(name) >= 0) {
            contactList.remove(getIndex(name));
            System.out.println("Contact of " + name + " has been removed.");
        } else {
            System.out.println(name + " does not exist in the contact list.");
        }
    }

    public void queryContactName(String name) {
        if (getIndex(name) >= 0) {
            System.out.println(name + ": " + contactList.get(getIndex(name)).getPhoneNumber());
        } else {
            System.out.println("No contact with name \"" + name + "\" exists");
        }
    }

    public void queryContactNumber(String number) {
        if (getIndexByNumber(number) >= 0) {
            System.out.println(contactList.get(getIndexByNumber(number)).getName() + ": " + number);
        } else {
            System.out.println("No contact with number \"" + number + "\" exists");
        }
    }

    public void printListOfContacts() {
        System.out.println("List of contacts:");
        for (int i = 0; i < contactList.size(); i++) {
            System.out.println(i + ". " + contactList.get(i).getName() + ": " + contactList.get(i).getPhoneNumber());
        }
    }

    private int getIndex(String name) {
        for (int i = 0; i < contactList.size(); i++) {
            if (contactList.get(i).getName().equals(name)) {
                return i;
            }
        }
        return -1;
    }

    private int getIndexByNumber(String number) {
        for (int i = 0; i < contactList.size(); i++) {
            if (contactList.get(i).getPhoneNumber().equals(number)) {
                return i;
            }
        }
        return -1;
    }

    private boolean contactExist(String name) {
        for (int i = 0; i < contactList.size(); i++) {
            if (contactList.get(i).getName().equals(name)) {
                return true;
            }
        }
        return false;
    }
}
