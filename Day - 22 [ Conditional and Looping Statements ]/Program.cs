using System;
/* Valid User Using if...else */
//bool isLoggedIn = !true;
//if (isLoggedIn)
//{
//    Console.WriteLine("WELCOME! YOU ARE A LOGGED IN USER");
//}
//else
//{
//    Console.WriteLine("Login to continue...");
//}

///* Dangling else problem */
//int x = 1;
//int y = 15;
//int z = 10;
//if (x > y)
//    if (y > z)
//        Console.WriteLine(" greater ");
//    else
//        Console.WriteLine("smaller");
//else
//    Console.WriteLine("Hello!");


/* Greatest among three numbers */
//if (x > y)
//    if (x > z)
//        Console.WriteLine($" {x} is greatest element");
//    else
//        Console.WriteLine($" {z} is greatest element");
//else
//    if (y > z)
//    Console.WriteLine($"{y} is the greatest element");
//else
//    Console.WriteLine($"{z} is the greatest element");


/* Condition should evaluate to bool */
//int x = 10;
//if (x != 0)
//{
//    Console.WriteLine("Not zero");
//}
//else
//{
//    Console.WriteLine("Is zero");
//}

//int month = 13;
//switch (month)
//{
//    case 1:
//        Console.WriteLine("January");
//        break;
//    case 2:
//        Console.WriteLine("February");
//        break;
//    case 3:
//        Console.WriteLine("March");
//        break;
//    case 4:
//        Console.WriteLine("April");
//        break;
//    case 5:
//        Console.WriteLine("May");
//        break;
//    case 6:
//        Console.WriteLine("June");
//        break;
//    case 7:
//        Console.WriteLine("July");
//        break;
//    case 8:
//        Console.WriteLine("August");
//        break;
//    case 9:
//        Console.WriteLine("September");
//        break;
//    case 10:
//        Console.WriteLine("October");
//        break;
//    case 11:
//        Console.WriteLine("November");
//        break;
//    case 12:
//        Console.WriteLine("December");
//        break;
//    default:
//        if (month < 1 || month > 12)
//        {
//            Console.WriteLine("Enter a valid month");
//        }
//        break;
//}



/* ODD OR EVEN */
//Console.Write("Enter an integer :");
//if (int.TryParse(Console.ReadLine(), out int x))
//{
//    if (x % 2 == 0)
//    {
//        Console.WriteLine($"{x} is Even");
//    }
//    else
//    {
//        Console.WriteLine($"{x} is Odd");
//    }
//}
//else
//{
//    Console.WriteLine("Enter a valid integer");
//}

/* Valid User Using if...else */

//string name = "ram";
//string pass = "ram456";
//Console.WriteLine("ENTER YOUR NAME :");
//string? x = Console.ReadLine();
//Console.WriteLine("ENTER YOUR PASSWORD :");
//string y = Console.ReadLine();

//if (name == x && pass == y)
//{
//    Console.WriteLine("ACCESS GRANTED");
//}
//else
//{
//    Console.WriteLine("ACCESS DENIED");
//}

/* Grade Calculator */
//if (double.TryParse(Console.ReadLine(), out double marks))
//{
//    if (marks > 100)
//    {
//        Console.WriteLine("Marks should be less than or equal to 100");
//    }
//    else if (marks >= 90)
//    {
//        Console.WriteLine("GRADE = A");
//    }
//    else if (marks >= 80)
//    {
//        Console.WriteLine("GRADE = B");
//    }
//    else if (marks >= 70)
//    {
//        Console.WriteLine("GRADE = C");
//    }
//    else if (marks >= 60)
//    {
//        Console.WriteLine("GRADE = D");
//    }
//    else if (marks >= 50)
//    {
//        Console.WriteLine("GRADE = E");
//    }
//    else
//    {
//        Console.WriteLine("FAIL");
//    }
//}
//else
//{
//    Console.WriteLine("Enter valid marks");
//}

/* SUM OF N NUMBERS */
//Console.Write("Enter an integer:");
//if (int.TryParse(Console.ReadLine(), out int max))
//{
//    int sum = 0;
//    for (int i = 1; i <= max; i++)
//    {
//        sum += i;
//    }
//    Console.WriteLine(sum);
//}
//else
//{
//    Console.WriteLine("Enter a valid number");
//}

//do
//{
//    Console.WriteLine("\n --MENU--");
//    Console.WriteLine("1. ADD");
//    Console.WriteLine("2. SUBTRACT");
//    Console.WriteLine("3. MULTIPLY");
//    Console.WriteLine("4. DIVIDE");
//    Console.WriteLine("5. EXIT");
//    Console.Write("Enter your choice : ");
//    if (double.TryParse(Console.ReadLine(), out double op))
//    {
//        if (op < 5)
//        {
//            Console.WriteLine("Enter first number :");
//            if (double.TryParse(Console.ReadLine(), out double num1))
//            {
//                Console.WriteLine("Enter second number");
//                if (double.TryParse(Console.ReadLine(), out double num2))
//                {
//                    switch (op)
//                    {
//                        case 1:
//                            Console.WriteLine($"{num1} + {num2} = {num1 + num2}");
//                            break;
//                        case 2:
//                            Console.WriteLine($"{num1} - {num2} = {num1 - num2}");
//                            break;
//                        case 3:
//                            Console.WriteLine($"{num1} * {num2} = {num1 * num2}");
//                            break;
//                        case 4:
//                            Console.WriteLine($"{num1} / {num2} = {num1 / num2}");
//                            break;
//                    }
//                }
//                else
//                {
//                    Console.WriteLine("Enter a vaild number");
//                }
//            }
//            else
//            {
//                Console.WriteLine("Enter a valid number");
//            }
//        }
//        else if (op == 5)
//        {
//            Console.WriteLine("Quiting");
//            break;
//        }
//        else
//        {
//            Console.WriteLine("Enter valid number");
//        }
//    }
//    else
//    {
//        Console.WriteLine("Enter a valid choice");
//    }
//    }while (true);

/* GUESS VALIDATOR */

////Random random = new Random();
////int res = random.Next(1, 11);
////Console.WriteLine("Guess a number between 1-10 : ");
////do
////{
////    if (int.TryParse(Console.ReadLine(), out int guess))
////    {
////        if (guess<0 || guess > 10)
////        {
////            Console.WriteLine("Enter number in range 1 - 10");
////continue
////        }
////        if (guess == res)
////        {
////            Console.WriteLine("Your guess is right!");
////            break;
////        }
////        else
////            Console.WriteLine("Oops...Try again ");
////        }
////    }
////} while (true);


/* PASSWORRD ATTEMPTS */
//string pass = "Password@123";
//int i = 3;
//do
//{
//    Console.Write("Enter Password : ");
//    string match = Console.ReadLine();
//    if (match == null || pass != match)
//    {
//        Console.WriteLine($"Passwaord inalid. {i - 1} attempts available.");
//    }
//    else if (match == pass)
//    {
//        Console.WriteLine("Success. Access Granted");
//        break;
//    }
//    i--;
//} while (i >0) ;


//int[] scores = { 85, 92, 78 };
//List<int> scoresList = new List<int> { 85, 92, 78 };

//// for loop - needs an index, works on both
//for (int i = 0; i < scores.Length; i++) // use .Count instead of .Length for the List version
//{
//    Console.Write(scores[i]+" ");
//}

//// foreach - no index needed, works on both
//foreach (int s in scores)
//{
//    Console.WriteLine(s);
//}
//foreach (int s in scoresList)
//{
//    Console.WriteLine(s);
}