


//Shape shape = new Circle(5);
//shape.PrintArea();
//public abstract class Shape
//{
//    public abstract double GetArea(); 
//    public void PrintArea()
//    {
//        Console.WriteLine($"Area: {GetArea()}");
//    }
//}

//public class Circle : Shape
//{
//    private double radius;
//    public Circle(double radius) => this.radius = radius;

//    public override double GetArea() => Math.PI * radius * radius;
//}

//public class Rectangle : Shape
//{
//    private double width, height;
//    public Rectangle(double w, double h) { width = w; height = h; }

//    public override double GetArea() => width * height;
//}




//var car = new Car();
//car.Start();
//Console.ReadLine();

//public class Engine
//{
//    public void Start() => Console.WriteLine("Engine starting...");
//}

//public class Car
//{
//    private Engine engine = new Engine(); // Car "has an" Engine

//    public void Start()
//    {
//        engine.Start(); // Car delegates to Engine
//        Console.WriteLine("Car is ready to drive.");
//    }
//}




IPaymentMethod payment = new PayPalPayment();
payment.Pay(50); // Paid 50 via PayPal

// Any class implementing IPaymentMethod can be swapped in interchangeably
List<IPaymentMethod> methods = new() { new CreditCardPayment(), new PayPalPayment() };
foreach (var m in methods) m.Pay(20);

public interface IPaymentMethod
{
    void Pay(double amount);
}

public class CreditCardPayment : IPaymentMethod
{
    public void Pay(double amount) => Console.WriteLine($"Paid {amount} via Credit Card");
}

public class PayPalPayment : IPaymentMethod
{
    public void Pay(double amount) => Console.WriteLine($"Paid {amount} via PayPal");
}

