import java.util.Scanner;

public class InterestCalculator {
    public static void main(String[] args) {
        // Declare scanner outside the try block so it's accessible in the finally block
        Scanner sc = null;
        
        try {
            sc = new Scanner(System.in);

            System.out.print("Enter Principal: ");
            // Use hasNextDouble() for safer input validation
            if (!sc.hasNextDouble()) {
                System.out.println("Invalid input for Principal. Expected a number. Exiting.");
                return; // Exits main method, but finally block will run before program termination
            }
            double p = sc.nextDouble();
            
            System.out.print("Enter Annual Rate (%): ");
            if (!sc.hasNextDouble()) {
                System.out.println("Invalid input for Rate. Expected a number. Exiting.");
                return; 
            }
            double r_percent = sc.nextDouble(); // Rate entered as a percentage (e.g., 5)

            System.out.print("Enter Time (years): ");
            if (!sc.hasNextDouble()) {
                System.out.println("Invalid input for Time. Expected a number. Exiting.");
                return; 
            }
            double t = sc.nextDouble();
            
            // --- Calculation using the decimal rate ---
            // Convert percentage (5) to decimal (0.05) for the formula
            double r_decimal = r_percent / 100.0;
            
            // Simple Interest Formula: SI = P * R * T 
            // The formula for Simple Interest is $SI = PRT$ 
            double si = p * r_decimal * t;
            
            // Compound Interest Formula (Annually compounded, n=1): CI = P * (1 + R)^T - P
            // The formula for Compound Interest (annually) is $CI = P(1 + R)^T - P$ 
            double ci = p * Math.pow(1 + r_decimal, t) - p;

            // --- Output Results ---
            System.out.println("\n--- Calculation Results ---");
            System.out.printf("Principal: $%.2f%n", p);
            System.out.printf("Rate: %.2f%%%n", r_percent);
            System.out.printf("Time: %.2f years%n", t);
            System.out.printf("Simple Interest: $%.2f%n", si);
            System.out.printf("Compound Interest: $%.2f%n", ci);
            
        } catch (Exception e) {
            // Handle unexpected runtime errors (e.g., interrupted I/O)
            System.err.println("An unexpected error occurred during processing: " + e.getMessage());
            
        } finally {
            // CRITICAL: Ensure the Scanner resource is closed in the finally block
            // This runs regardless of whether the try block succeeded, failed, or was exited early by 'return'.
            if (sc != null) {
                sc.close();
                System.out.println("Scanner closed successfully.");
            }
        }
    }
}