package com.company;

class Hamburger {
    private String name;
    private String breadRollType;
    private String meat;
    private double basePrice;
    private String addition1;
    private double addition1Price;
    private String addition2;
    private double addition2Price;
    private String addition3;
    private double addition3Price;
    private String addition4;
    private double addition4Price;
    private double totalPrice;

    public Hamburger(String name, String breadRollType, String meat, double basePrice) {
        this.name = name;
        this.breadRollType = breadRollType;
        this.meat = meat;
        this.basePrice = basePrice;
    }

    public String getName() {
        return name;
    }

    public String getBreadRollType() {
        return breadRollType;
    }

    public String getMeat() {
        return meat;
    }

    public double getBasePrice() {
        return basePrice;
    }

    public void setAddition1(String name, double price) {
        this.addition1 = name;
        this.addition1Price = price;
    }

    public void setAddition2(String name, double price) {
        this.addition2 = name;
        this.addition2Price = price;
    }

    public void setAddition3(String name, double price) {
        this.addition3 = name;
        this.addition3Price = price;
    }

    public void setAddition4(String name, double price) {
        this.addition4 = name;
        this.addition4Price = price;
    }

    public double getTotalPrice() {
        double totalPrice = this.basePrice;
        System.out.println(this.name + " hamburger on a " + this.breadRollType + " roll "
                    + "price is " + this.basePrice);
        if (this.addition1 != null) {
            totalPrice += this.addition1Price;
            System.out.println("Added " + this.addition1 + " for an extra " + this.addition1Price);
        }
        if (this.addition2 != null) {
            totalPrice += this.addition2Price;
            System.out.println("Added " + this.addition2 + " for an extra " + this.addition2Price);
        }
        if (this.addition3 != null) {
            totalPrice += this.addition3Price;
            System.out.println("Added " + this.addition3 + " for an extra " + this.addition3Price);
        }
        if (this.addition4 != null) {
            totalPrice += this.addition4Price;
            System.out.println("Added " + this.addition4 + " for an extra " + this.addition4Price);
        }
        return totalPrice;
    }
}

class HealthyBurger extends Hamburger {
    private String healthyExtra1;
    private double healthyExtra1Price;
    private String healthyExtra2;
    private double healthyExtra2Price;

    public HealthyBurger(String meat, double basePrice) {
        super("Healthy burger", "brown rye", meat, basePrice);
    }

    public void setHealthyExtra1(String healthyExtra1, double healthyExtra1Price) {
        this.healthyExtra1 = healthyExtra1;
        this.healthyExtra1Price = healthyExtra1Price;
    }

    public void setHealthyExtra2(String healthyExtra2, double healthyExtra2Price) {
        this.healthyExtra2 = healthyExtra2;
        this.healthyExtra2Price = healthyExtra2Price;
    }

    @Override
    public double getTotalPrice() {
        double totalPrice = super.getTotalPrice();
        if (this.healthyExtra1 != null) {
            totalPrice += this.healthyExtra1Price;
            System.out.println("Added " + this.healthyExtra1 + " for an extra " + this.healthyExtra1Price);
        }
        if (this.healthyExtra2 != null) {
            totalPrice += this.healthyExtra2Price;
            System.out.println("Added " + this.healthyExtra2 + " for an extra " + this.healthyExtra2Price);
        }
        return totalPrice;
    }
}

class DeluxeBurger extends Hamburger {
    public DeluxeBurger() {
        super("Deluxe", "Sausage & bacon", "White", 15.99);
        super.setAddition1("Chips", 3.55);
        super.setAddition2("Drinks", 2.00);
    }

    @Override
    public void setAddition1(String name, double price) {
        System.out.println("Cannot add additional items to this type of hamburger");
    }

    @Override
    public void setAddition2(String name, double price) {
        System.out.println("Cannot add additional items to this type of hamburger");
    }

    @Override
    public void setAddition3(String name, double price) {
        System.out.println("Cannot add additional items to this type of hamburger");
    }

    @Override
    public void setAddition4(String name, double price) {
        System.out.println("Cannot add additional items to this type of hamburger");
    }
}

public class Main {

    public static void main(String[] args) {


        // The purpose of the application is to help a fictitious company called Bills Burgers to manage
        // their process of selling hamburgers.
        // Our application will help Bill to select types of burgers, some of the additional items (additions) to
        // be added to the burgers and pricing.
        // We want to create a base hamburger, but also two other types of hamburgers that are popular ones in Bills store.
        // The basic hamburger should have the following items.
        // Bread roll type, meat and up to 4 additional additions (things like lettuce, tomato, carrot, etc) that
        // the customer can select to be added to the burger.
        // Each one of these items gets charged an additional price so you need some way to track how many items got added
        // and to calculate the final price (base burger with all the additions).
        // This burger has a base price and the additions are all separately priced (up to 4 additions, see above).
        // Create a Hamburger class to deal with all the above.
        // The constructor should only include the roll type, meat and price, can also include name of burger or you
        // can use a setter.
        // Also create two extra varieties of Hamburgers (subclasses) to cater for
        // a) Healthy burger (on a brown rye bread roll), plus two addition items that can be added.
        // The healthy burger can have 6 items (Additions) in total.
        // hint:  you probably want to process the two additional items in this new class (subclass of Hamburger),
        // not the base class (Hamburger), since the two additions are only appropriate for this new class
        // (in other words new burger type).
        // b) Deluxe hamburger - comes with chips and drinks as additions, but no extra additions are allowed.
        // hint:  You have to find a way to automatically add these new additions at the time the deluxe burger
        // object is created, and then prevent other additions being made.
        //  All 3 classes should have a method that can be called anytime to show the base price of the hamburger
        // plus all additionals, each showing the addition name, and addition price, and a grand/final total for the
        // burger (base price + all additions)
        // For the two additional classes this may require you to be looking at the base class for pricing and then
        // adding totals to final price.
        Hamburger hamburger = new Hamburger("Basic", "Sausage", "White",3.56);
        double price = hamburger.getTotalPrice();
        hamburger.setAddition1("Tomato", 0.27);
        hamburger.setAddition2("Lettuce", 0.75);
        hamburger.setAddition3("Cheese", 1.13);
        System.out.println("Total Burger price is " + hamburger.getTotalPrice());

        HealthyBurger healthyBurger = new HealthyBurger("Bacon", 5.67);
        healthyBurger.setAddition1("Egg", 5.43);
        healthyBurger.setHealthyExtra1("Lentils", 3.41);
        System.out.println("Total Healthy Burger price is  " + healthyBurger.getTotalPrice());

        DeluxeBurger db = new DeluxeBurger();
        db.setAddition3("Should not do this", 50.53);
        db.getTotalPrice();
    }
}
