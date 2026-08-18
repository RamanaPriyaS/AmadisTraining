public class Student
{
    public string Name;
    public int RollNumber;
}
public class Circle
{
    public double Radius;

    public double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
}

public class Person
{
    public string Name;
    public int Age;

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}
public class BankAccount
{
    private double balance;

    public double Balance
    {
        get { return balance; }
        set
        {
            if (value < 0)
                Console.WriteLine("Balance cannot be negative. Ignoring update.");
            else
                balance = value;
        }
    }
}

public class Car
{
    public static int TotalCarsCreated = 0;

    public Car()
    {
        TotalCarsCreated++;
    }
}
public class Calculator
{
    public int Divide(int a, int b)
    {
        try
        {
            return a / b;
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine("Error: " + ex.Message);
            return 0;
        }
    }
}

public class InvalidAgeException : Exception
{
    public InvalidAgeException(string message) : base(message) { }
}

public class Registration
{
    public void Register(int age)
    {
        if (age < 18)
            throw new InvalidAgeException("Age must be 18 or above to register.");

        Console.WriteLine("Registration successful.");
    }
}
public class Program
{
    public static void Main()
    {
        //Console.WriteLine("=== Task 1: Student ===");
        //Student s = new Student();
        //s.Name = "Riya";
        //s.RollNumber = 21;
        //Console.WriteLine($"Name: {s.Name}, Roll Number: {s.RollNumber}");


        //Console.WriteLine("\n=== Task 2: Circle Area ===");
        //Circle c = new Circle();
        //c.Radius = 5;
        //Console.WriteLine($"Radius: {c.Radius}, Area: {c.CalculateArea():F2}");

        //Console.WriteLine("\n=== Task 3: Person (parameterized constructor) ===");
        //Person p = new Person("Aman", 25);
        //Console.WriteLine($"Name: {p.Name}, Age: {p.Age}");

        //Console.WriteLine("\n=== Task 4: BankAccount (encapsulation) ===");
        //BankAccount account = new BankAccount();
        //account.Balance = 1000;
        //Console.WriteLine($"Balance set to: {account.Balance}");
        //account.Balance = -500; // rejected by the setter
        //Console.WriteLine($"Balance after invalid update attempt: {account.Balance}");


        //Console.WriteLine("\n=== Task 5: Car (static counter) ===");
        //new Car();
        //new Car();
        //new Car();
        //Console.WriteLine($"Total cars created: {Car.TotalCarsCreated}");




        //Console.WriteLine("\n=== Task 6: Calculator (try/catch) ===");
        //Calculator calc = new Calculator();
        //Console.WriteLine($"10 / 2 = {calc.Divide(10, 2)}");
        //Console.WriteLine($"10 / 0 = {calc.Divide(10, 0)}");


        //Console.WriteLine("\n=== Task 7: Registration (custom exception) ===");
        //Registration reg = new Registration();
        //try
        //{
        //    reg.Register(15);
        //}
        //catch (InvalidAgeException ex)
        //{
        //    Console.WriteLine("Caught custom exception: " + ex.Message);
        //}
        //reg.Register(20);

    }
}

























