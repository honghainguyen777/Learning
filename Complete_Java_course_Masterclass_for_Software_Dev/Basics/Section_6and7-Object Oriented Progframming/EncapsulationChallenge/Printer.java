package com.company;

public class Printer {
    private int tonerLevel, numPagesPrinted;
    private boolean duplexPrinter;

    public Printer(int tonerLevel, boolean duplexPrinter) {
        if (tonerLevel >-1 && tonerLevel <= 100)
            this.tonerLevel = tonerLevel;
        else
            this.tonerLevel = -1;

        this.duplexPrinter = duplexPrinter;
        this.numPagesPrinted = 0;
    }

    public int addToner(int tonerAmount) {
        if (tonerAmount > 0 && tonerAmount <= 100) {
            if (this.tonerLevel + tonerAmount > 100) {
                return -1;
            }
            this.tonerLevel += tonerAmount;
            return this.tonerLevel;
        } else {
            return -1;
        }
    }

    public int printPages(int pages) {
        int pageToPrint = pages;
        if (this.duplexPrinter) {
            pageToPrint = pages / 2 + pages % 2;
            System.out.println("Printing in duplex mode");
        }
        this.numPagesPrinted += pageToPrint;
        return pageToPrint;
    }

    public int getNumPagesPrinted() {
        return numPagesPrinted;
    }
}
