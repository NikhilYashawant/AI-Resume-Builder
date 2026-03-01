import java.util.Scanner;
public class OddNum {
    public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    System.out.println("Enter a number:");
    int n=s.nextInt();
    if(n%2==1)
        System.out.println(n+"is odd");  
    s.close();
    }
    
}
