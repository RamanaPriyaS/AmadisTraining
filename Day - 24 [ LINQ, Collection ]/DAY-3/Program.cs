
//Console.WriteLine("=== Task 1: Shopping Cart ===");

//List<string> cart = new List<string>();
//cart.Add("Apples");
//cart.Add("Bread");
//cart.Add("Milk");
//cart.Add("Eggs");
//cart.Add("Cheese");

//Console.WriteLine($"Count: {cart.Count}, Capacity: {cart.Capacity}");

//cart.Insert(0, "Coffee");            
//cart.Remove("Bread");               

//Console.WriteLine("Final cart: " + string.Join(", ", cart));


//Console.WriteLine("=== Task 2: Student Roster ===");

//var roster = new Dictionary<string, int>();
//roster.Add("Alice", 90);
//roster.Add("Bob", 75);
//roster.Add("Carol", 88);

//roster["Bob"] = 80;

//if (roster.TryGetValue("Dave", out int daveScore))
//    Console.WriteLine($"Dave's score: {daveScore}");
//else
//    Console.WriteLine("Dave is not in the roster.");

//try
//{
//    roster.Add("Alice", 100);
//}
//catch (ArgumentException ex)
//{
//    Console.WriteLine($"Caught expected exception: {ex.Message}");
//}

//foreach (var kvp in roster)
//    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
//Console.WriteLine();



//Console.WriteLine("=== Task 3: Word Frequency Counter ===");

//string sentence = "the quick brown fox jumps over the lazy dog the fox runs";
//string[] words = sentence.Split(' ', StringSplitOptions.RemoveEmptyEntries);

//// Approach 1: ContainsKey check
//var counts1 = new Dictionary<string, int>();
//foreach (var word in words)
//{
//    if (counts1.ContainsKey(word))
//        counts1[word]++;
//    else
//        counts1[word] = 1;
//}

//// Approach 2: TryGetValue (avoids a second lookup)
//var counts2 = new Dictionary<string, int>();
//foreach (var word in words)
//{
//    if (counts2.TryGetValue(word, out int current))
//        counts2[word] = current + 1;
//    else
//        counts2[word] = 1;
//}

//// Approach 3: GetValueOrDefault (most concise)
//var counts3 = new Dictionary<string, int>();
//foreach (var word in words)
//{
//    counts3[word] = counts3.GetValueOrDefault(word, 0) + 1;
//}

//foreach (var kvp in counts3.OrderByDescending(k => k.Value))
//    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
//Console.WriteLine();


//bool ContainsDuplicate(List<int> nums)
//{
//    var seen = new HashSet<int>();
//    foreach (var n in nums)
//    {
//        if (!seen.Add(n))
//            return true;
//    }
//    return false;
//}

//Console.WriteLine("=== Task 4: Duplicate Detector ===");

//var withDupes = new List<int> { 1, 2, 3, 4, 2, 5 };
//var uniqueOnly = new HashSet<int>(withDupes);

//Console.WriteLine("Original: " + string.Join(", ", withDupes));
//Console.WriteLine("Unique:   " + string.Join(", ", uniqueOnly));
//Console.WriteLine($"Has duplicate? {ContainsDuplicate(withDupes)}");
//Console.WriteLine();


//Console.WriteLine("=== Task 5: Set Operations ===");

//var postA = new HashSet<string> { "csharp", "dotnet", "tutorial", "beginner" };
//var postB = new HashSet<string> { "csharp", "linq", "tutorial", "advanced" };

//var allTags = new HashSet<string>(postA);
//allTags.UnionWith(postB);

//var commonTags = new HashSet<string>(postA);
//commonTags.IntersectWith(postB);

//var onlyInA = new HashSet<string>(postA);
//onlyInA.ExceptWith(postB);

//Console.WriteLine("All tags:    " + string.Join(", ", allTags));
//Console.WriteLine("Common tags: " + string.Join(", ", commonTags));
//Console.WriteLine("Only in A:   " + string.Join(", ", onlyInA));
//Console.WriteLine();

//Console.WriteLine("=== Task 6: LINQ Pipeline ===");

//var people = new List<Person>
//            {
//                new Person { Name = "Zara",  Age = 25, City = "Chennai" },
//                new Person { Name = "Amit",  Age = 17, City = "Delhi" },
//                new Person { Name = "Bala",  Age = 30, City = "Chennai" },
//                new Person { Name = "Nina",  Age = 15, City = "Mumbai" },
//                new Person { Name = "Omar",  Age = 22, City = "Delhi" },
//            };

//var methodSyntaxResult = people
//    .Where(p => p.Age >= 18)
//    .Select(p => p.Name)
//    .OrderBy(name => name)
//    .ToList();

//var querySyntaxResult = (from p in people
//                         where p.Age >= 18
//                         orderby p.Name
//                         select p.Name).ToList();

//Console.WriteLine("Method syntax: " + string.Join(", ", methodSyntaxResult));
//Console.WriteLine("Query syntax:  " + string.Join(", ", querySyntaxResult));
//Console.WriteLine();

//public class Person
//{
//    public string Name { get; set; }
//    public int Age { get; set; }
//    public string City { get; set; }
//}








//Console.WriteLine("=== Task 6: Deferred Execution Trap ===");

//var nums = new List<int> { 1, 3, 6, 8, 2 };
//var q = nums.Where(n => n > 5); 

//Console.WriteLine("First evaluation: " + string.Join(", ", q));

//nums.Add(10); 

//Console.WriteLine("Second evaluation (after Add(10)): " + string.Join(", ", q));

//var snapshot = nums.Where(n => n > 5).ToList();
//nums.Add(20);
//Console.WriteLine("Snapshot (ToList) stays fixed: " + string.Join(", ", snapshot));
//Console.WriteLine();
















//long Factorial(int n)
//{
//    Console.WriteLine($"Factorial called with n={n}");
//    if (n <= 1) return 1;
//    return n * Factorial(n - 1);
//}

//int Fibonacci(int n)
//{
//    Console.WriteLine($"Fibonacci called with n={n}");
//    if (n <= 1) return n;
//    return Fibonacci(n - 1) + Fibonacci(n - 2);
//}

//static long FactorialNoBaseCase(int n)
//{
//    return n * FactorialNoBaseCase(n - 1);
//}

//Console.WriteLine("=== Task 7: Recursion ===");

//Console.WriteLine($"Factorial(5) = {Factorial(5)}");
//Console.WriteLine($"Fibonacci(6) = {Fibonacci(6)}");

//Console.WriteLine($"FactorialNoBaseCase(5)");
//FactorialNoBaseCase(5);
//Console.WriteLine();
