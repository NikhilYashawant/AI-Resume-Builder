// Check if a number is positive.
import java.util.Scanner;
class NumPositive{
    public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    System.out.println("Enter a number:");
    int n=s.nextInt();
    if(n>0)
        System.out.println(n+"is positive");  
    s.close();
    }
    

}