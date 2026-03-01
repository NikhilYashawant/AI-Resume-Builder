import java.util.Scanner;
public class CharUppercase {
    public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    System.out.println("Enter a char:");
    char ch = s.next().charAt(0);
        if(ch>='A'&& ch<='Z')
            System.out.println(ch+"is uppercase");
        s.close();
    }
    

}
