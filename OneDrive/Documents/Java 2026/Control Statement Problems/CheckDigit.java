import java.util.Scanner;

public class CheckDigit {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);

        if (ch >= '0' && ch <= '9') {
            System.out.println("It is a digit");
        } else {
            System.out.println("It is not a digit");
        }
    }
}

