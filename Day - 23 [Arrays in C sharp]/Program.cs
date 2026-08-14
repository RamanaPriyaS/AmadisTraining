/*string - Reference Type but immutable */

using System.Text;

//string name = "Raya";
//string Name = name;
//Console.WriteLine($"name : {name}");
//Console.WriteLine($"Name : {Name}");
//name = "Raha";
//Console.WriteLine($"name : {name}");
//Console.WriteLine($"Name : {Name}");
//Console.ReadLine();


///* class -Reference Type + mutable */

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

/* String Builder */
//StringBuilder str1 = new StringBuilder("RAYA");
//StringBuilder str2 = str1;
//Console.WriteLine(str1);
//str1.Replace("RAYA", "riya");
//// OR: str1[0] = 'r';
//Console.WriteLine(str1.ToString());
//Console.WriteLine(str2.ToString());

//int[] arr = new int[] { 2, 4, 6, 8, 10, 12, 14 };
//int[] arr1 = new int[] { 2, 4, 6, 8, 10, 12, 14 };
//int[] arr2 = arr1;
//string a = "heelo";
//string b = "heelo";
//Console.WriteLine($"arr : {string.Join(',', arr)}");
//Console.WriteLine($"arr1 : {string.Join(',', arr1)}");
//Console.WriteLine($"A :{ a}");
//Console.WriteLine($"B :{b}");
//Console.WriteLine($"a==b : {a == b}");
//Array.Reverse(arr);
//Console.WriteLine($"Array.Reverse(arr) : {string.Join(',', arr)}");
//Array.Sort(arr);
//Console.WriteLine($"Array.Sort(arr) : {string.Join(',', arr)}");
//Array.Reverse(arr);
//Console.WriteLine($"Array.Sort(arr) : {string.Join(',', arr)}");
//Console.WriteLine($"arr.Min() : {arr.Min()}");
//Console.WriteLine($"arr.Min() : {arr.Max()}");
//Console.WriteLine($"arr.Reverse() : {string.Join(',', arr.Reverse())}");
//Console.WriteLine($"arr ==arr1 : {arr == arr1}");
//Console.WriteLine($"arr ==arr1 : {arr1 == arr2}");
//Console.WriteLine($"arr.SequenceEquals(arr1) : {arr.SequenceEqual(arr1)}");
//Console.WriteLine($" arr.OrderByDescending(x=>x) : {string.Join(',', arr.OrderByDescending(x=>x))}");



//string s = "Party";
//Console.Write(s.Substring(2, 1));



//[] nums = { 5, 3, 8, 1, 9, 2, 7 };
//Console.WriteLine("nums = [" + string.Join(", ", nums) + "]");
//Console.WriteLine("Length = " + nums.Length);
//Console.WriteLine("nums[0] = " + nums[0] + ", nums[^1] (last) = " + nums[^1]);

//int[] a1 = (int[])nums.Clone();
//Array.Sort(a1);
//Console.WriteLine("After Array.Sort: [" + string.Join(", ", a1) + "]");
//Array.Reverse(a1);
//Console.WriteLine("After Array.Reverse: [" + string.Join(", ", a1) + "]");

//Console.WriteLine("Array.IndexOf(nums, 8) = " + Array.IndexOf(nums, 8));
//Console.WriteLine("Array.IndexOf(nums, 100) [not found] = " + Array.IndexOf(nums, 100));
//Console.WriteLine("Array.Exists(nums, x => x > 8) = " + Array.Exists(nums, x => x > 8));
//Console.WriteLine("Array.Find(nums, x => x > 5) [first match] = " + Array.Find(nums, x => x > 5));
//Console.WriteLine("Array.FindAll(nums, x => x > 5) = [" + string.Join(", ", Array.FindAll(nums, x => x > 5)) + "]");
//Console.WriteLine("Array.TrueForAll(nums, x => x > 0) = " + Array.TrueForAll(nums, x => x > 0));

//int[] a2 = (int[])nums.Clone();
//Array.Clear(a2, 0, 2); // clears first 2 elements to default(0)
//Console.WriteLine("After Array.Clear(a2,0,2): [" + string.Join(", ", a2) + "]");

//int[] a3 = new int[5];
//Array.Fill(a3, 7); // fills entire array with 7
//Console.WriteLine("After Array.Fill(a3,7): [" + string.Join(", ", a3) + "]");

//int[] a4 = { 1, 2, 3 };
//]Array.Resize(ref a4, 5); // grows array, new slots = default(0)
//Console.WriteLine("After Array.Resize(a4,5): [" + string.Join(", ", a4) + "]");


//int[] source = { 10, 20, 30 };
//int[] dest = new int[3];
//Array.Copy(source, dest, source.Length);
//Console.WriteLine("Array.Copy result: [" + string.Join(", ", dest) + "]");
//int[] cloned = (int[])source.Clone();
//Console.WriteLine("Clone() result: [" + string.Join(", ", cloned) + "]");

//PrintSub("LINQ Array Extensions (System.Linq)");
//Console.WriteLine("nums.Min() = " + nums.Min());
//Console.WriteLine("nums.Max() = " + nums.Max());
//Console.WriteLine("nums.Sum() = " + nums.Sum());
//Console.WriteLine("nums.Average() = " + nums.Average());
//Console.WriteLine("nums.Count(x => x > 4) = " + nums.Count(x => x > 4));
//Console.WriteLine("nums.OrderBy(x => x) = [" + string.Join(", ", nums.OrderBy(x => x)) + "]");
//Console.WriteLine("nums.OrderByDescending(x => x) = [" + string.Join(", ", nums.OrderByDescending(x => x)) + "]");
//Console.WriteLine("nums.Where(x => x % 2 == 0) = [" + string.Join(", ", nums.Where(x => x % 2 == 0)) + "]");
//Console.WriteLine("nums.Select(x => x * 2) = [" + string.Join(", ", nums.Select(x => x * 2)) + "]");
//Console.WriteLine("nums.Reverse() [LINQ, does NOT mutate] = [" + string.Join(", ", nums.Reverse()) + "]");
//Console.WriteLine("nums after LINQ Reverse (unchanged) = [" + string.Join(", ", nums) + "]");
//Console.WriteLine("nums.Contains(9) = " + nums.Contains(9));
//Console.WriteLine("nums.First() = " + nums.First() + ", nums.Last() = " + nums.Last());
//Console.WriteLine("nums.Skip(2).Take(3) = [" + string.Join(", ", nums.Skip(2).Take(3)) + "]");
//Console.WriteLine("nums.Distinct() = [" + string.Join(", ", new int[] { 1, 1, 2, 2, 3 }.Distinct()) + "]");
//Console.WriteLine("nums.ToList() type = " + nums.ToList().GetType().Name);


//int[,] matrix = new int[2, 3]
//{
//    { 1, 2, 3 },
//    { 4, 5, 6 }
//};
//Console.WriteLine("Rows = " + matrix.GetLength(0) + ", Cols = " + matrix.GetLength(1));
//Console.WriteLine("Total Length = " + matrix.Length);
//Console.WriteLine("Rank (dimensions) = " + matrix.Rank);
//for (int i = 0; i < matrix.GetLength(0); i++)
//{
//    for (int j = 0; j < matrix.GetLength(1); j++)
//        Console.Write(matrix[i, j] + " ");
//    Console.WriteLine();
//}

//int[][] jagged = new int[][]
//{
//    new int[] { 1, 2 },
//    new int[] { 3, 4, 5 },
//    new int[] { 6 }
//};
//Console.WriteLine("Row count (jagged.Length) = " + jagged.Length);
//for (int i = 0; i < jagged.Length; i++)
//    Console.WriteLine("Row " + i + " (Length=" + jagged[i].Length + "): [" + string.Join(", ", jagged[i]) + "]");
//Console.WriteLine("Total elements (sum of row lengths) = " + jagged.Sum(row => row.Length));


//string s = "  Hello, World! Hello, C#!  ";
//Console.WriteLine("s = \"" + s + "\"");
//Console.WriteLine("Contains(\"World\") = " + s.Contains("World"));
//Console.WriteLine("IndexOf(\"Hello\") = " + s.IndexOf("Hello"));
//Console.WriteLine("IndexOf(\"Hello\", 10) = " + s.IndexOf("Hello", 10));
//Console.WriteLine("LastIndexOf(\"Hello\") = " + s.LastIndexOf("Hello"));
//Console.WriteLine("IndexOf(\"xyz\") [not found] = " + s.IndexOf("xyz"));
//Console.WriteLine("StartsWith(\"  Hello\") = " + s.StartsWith("  Hello"));
//Console.WriteLine("EndsWith(\"  \") = " + s.EndsWith("  "));
//Console.WriteLine("IndexOfAny(['W','C']) = " + s.IndexOfAny(new char[] { 'W', 'C' }));


//string clean = "Party";
//Console.WriteLine("Substring(2) on \"Party\" = \"" + clean.Substring(2) + "\"");
//Console.WriteLine("Substring(1,3) on \"Party\" = \"" + clean.Substring(1, 3) + "\"");
//Console.WriteLine("Substring(2,0) [empty, valid] = \"" + clean.Substring(2, 0) + "\"");
//Console.WriteLine("Range \"Party\"[1..3] = \"" + clean[1..3] + "\"");
//Console.WriteLine("Index from end \"Party\"[^2..] = \"" + clean[^2..] + "\"");
//Console.WriteLine("Indexer \"Party\"[0] = '" + clean[0] + "'");
//char[] chars = clean.ToCharArray();
//Console.WriteLine("ToCharArray() = [" + string.Join(",", chars) + "]");


StringBuilder sb1 = new StringBuilder();
StringBuilder sb2 = new StringBuilder(50);           // initial capacity
StringBuilder sb3 = new StringBuilder("Hello");      // initial text
StringBuilder sb4 = new StringBuilder("Hi", 100);    // text + capacity
Console.WriteLine("sb3 (\"Hello\") -> Length=" + sb3.Length + ", Capacity=" + sb3.Capacity);


