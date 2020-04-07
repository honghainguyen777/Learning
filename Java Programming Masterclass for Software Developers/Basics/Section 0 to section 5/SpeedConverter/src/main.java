public class main {
    public static void main(String[] args) {
        System.out.println(toMilesPerHour(75.114));
        printConversion(10.25);
    }

    public static long toMilesPerHour(double kilometersPerHour) {

        if (kilometersPerHour < 0)
            return -1;
        else
            return Math.round(kilometersPerHour / 1.609);
    }
    public static void printConversion(double kilometersPerHour) {
        if (kilometersPerHour >= 0) {
            long milesPerHour = Math.round(kilometersPerHour / 1.609);
            System.out.println(kilometersPerHour + " km/h = " + milesPerHour +
                    " mi/h");
        } else
            System.out.println("Invalid Value");
    }
}
