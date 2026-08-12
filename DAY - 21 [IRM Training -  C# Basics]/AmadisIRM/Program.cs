using System;
/* NAMESPACE PRACTICE */
//AmadisIRM.Zoo.Animal elephant = new AmadisIRM.Zoo.Animal();
//elephant.Species = "Elephas Maximus";
//elephant.Habitat = "Tropical";
//elephant.DisplayAnimals(elephant.Species, elephant.Habitat);

//AmadisIRM.Farm.Animal cow = new AmadisIRM.Farm.Animal();
//cow.Name = "Bessie";
//cow.OwnerName = "Riya";
//cow.DisplayAnimals(cow.Name, cow.OwnerName);


/* Age from year of Birth */

//Console.Write("Enter Year of birth : ");
//if (int.TryParse(Console.ReadLine(), out int yob)) {
//    int age = DateTime.Now.Year - yob;
//    Console.Write($"Your age is { age.ToString()}");
//}
//else
//{
//    Console.WriteLine("Invalid Year");
//}


/* CLASSES */

///<summary>
///A Calculator class to perform basic arithmetic operations.
/// </summary>
//Calculator c1 = new Calculator(5.9, 3.2);
//Console.WriteLine(c1.Div());
//class Calculator {
//    double op1, op2;
//    public Calculator(double op1, double op2)
//    {
//        this.op1 = op1;
//        this.op2 = op2;
//    }
//    public double Add()
//    {
//        return op1 + op2;
//    }
//    public double Sub()
//    {
//        return op1 - op2;
//    }
//    public double Mul()
//    {
//        return op1 * op2;
//    }
//    public double Div()
//    {
//        return op1 / op2;
//    }
//}



/* CONSTANT */

//Console.WriteLine("TYPE CASTING");
//const double pi = 3.14159;
//int radius = 90;
//double rad = radius;
//Console.WriteLine($"int radius = {radius}");
//Console.WriteLine($"double rad = {rad}");
//double area = pi * radius * radius;
//Console.WriteLine($"Area = {area}");
//int r1 = (int)area;
//Console.WriteLine($"(int)area = {r1}");
//int r2 = Convert.ToInt32(area);
//Console.WriteLine($"Convert.ToInt32(area) = {r2}");
//Console.ReadLine();


//string num1 = "345";
//string num = "12345";
//int n1 = Convert.ToInt32(num);
////int n2 = Convert.ToInt32(num1); //Causes Exception
//Console.WriteLine(n1);
//bool success = int.TryParse(num1, out int n3);
//Console.WriteLine($"{success},{n3}");
//Console.ReadLine();

/* VALUE TYPE VS REFERENCE TYPE */

//int a = 10;
//int A = a;
//Console.WriteLine($"A = {A}");
//A = 90;
//Console.WriteLine($"a = {a}");
//Console.WriteLine($"A = {A}");


/* string - Reference Type but immutable */

//string name = "Raya";
//string Name = name;
//Console.WriteLine($"name : {name}");
//Console.WriteLine($"Name : {Name}");
//name = "Raha";
//Console.WriteLine($"name : {name}");
//Console.WriteLine($"Name : {Name}");
//Console.ReadLine();


/* class -Reference Type + mutable */

//Person p1 = new Person();
//p1.Name = "Riya";
//Person p2 = p1;
//Console.WriteLine(p1.Name);
//Console.WriteLine(p2.Name);
//p1.Name = "Ahaana";
//Console.WriteLine(p1.Name);
//Console.WriteLine(p2.Name);
//class Person
//{
//    public string Name;
//}


/* COMPARISION OPERATORS  */

//bool great = 15 > 12;
//bool less = 19 < 30;
//bool and = great && less;
//Console.WriteLine(great);
//Console.WriteLine(less);
//Console.WriteLine(and);
//Console.ReadLine();


/* ARITHMETIC AND ASSIGNMENT OPERATORS */

//int a = 45;
//int b = 95;
//Console.WriteLine($"{a} + {b} = {a + b}");
//Console.WriteLine($"{b} - {a} = {b - a}");
//Console.WriteLine($"{a} * {b} = {a * b}");
//Console.WriteLine($"{b} / {a} = {b / a}");
//Console.WriteLine($"{b} / {a} = {(double)b / a}");
//Console.WriteLine($"INCREMENT OF {a} = {a += 1}");
//Console.WriteLine($"Decrement of {a} = {a -= 1}");
//Console.ReadLine();


/* VARIABLES */

//string name = "Riya";
//string course = "C#";
//Console.WriteLine($"Hi,{name}! WELCOME TO {course} journey");
//Console.ReadLine();

/* PRE INCREMENT OPERATOR */
int x = 5;
int y = ++x; 

Console.WriteLine(y);
Console.WriteLine(x); 