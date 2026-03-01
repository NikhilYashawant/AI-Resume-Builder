import java.util.Scanner;
public class CharLowercase {
    public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    System.out.println("Enter a char:");
    char ch = s.next().charAt(0);
        if(ch>='a'&& ch<='z')
            System.out.println(ch+"is lowercase");
        s.close();
    }
    

}
