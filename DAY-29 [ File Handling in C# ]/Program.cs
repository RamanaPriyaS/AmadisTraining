using System.IO;
using System.Text;
string folder = @"D:\Training\DAYS";
//if (Directory.Exists(folder))
//{
//    Console.WriteLine("Folder already exists.");
//}
//else
//{
//    Directory.CreateDirectory(folder);
//    Console.WriteLine("Folder created.");
//}
//Console.WriteLine();


























//Console.WriteLine("========================FILE.WRITEALLLINES=========================");
//string path = Path.Combine(folder, "quick.txt");
//string[] lines = { "Apple", "Banana", "Cherry" };
//File.WriteAllLines(path, lines);
//Console.WriteLine("quick.txt written via File.WriteAllLines");
//Console.WriteLine();











//Console.WriteLine("========================FILE READ ALL LINE============================");
string path2 = Path.Combine(folder, "quick.txt");
//string[] allLines = File.ReadAllLines(path2);
//Console.WriteLine($"ReadAllLines returned: {allLines.GetType().Name}, count = {allLines.Length}");
//Console.WriteLine();




















//Console.WriteLine("========================STREAM WRITER=========================");

//string path1 = Path.Combine(folder, "manual.txt");
//using (StreamWriter writer = new StreamWriter(path1))
//{
//    writer.WriteLine("Apple");
//    writer.WriteLine("Banana");
//    writer.WriteLine("Cherry");
//}
//Console.WriteLine("manual.txt written via StreamWriter");
//Console.WriteLine();













//Console.WriteLine("========================STREAM RAEDER============================");
//using (StreamReader reader = new StreamReader(path2))
//{
//    string line;
//    int count = 0;
//    while ((line = reader.ReadLine()) != null)
//    {
//        count++;
//    }
//    Console.WriteLine($"StreamReader manually counted {count} lines");
//}
//Console.WriteLine();















//Console.WriteLine("========================FILE STREAM WRITER===============================");
string path3 = Path.Combine(folder, "numbers.txt");

//int[] numbers = { 10, 20, 30, 40, 50 };
//string text = string.Join(" ", numbers);
//byte[] data = Encoding.UTF8.GetBytes(text);
//using (FileStream fs = new FileStream(path3, FileMode.Create, FileAccess.Write))
//    fs.Write(data, 0, data.Length);
//Console.WriteLine("DATA WRITTEN INTO numbers.txt SUCESSFULLY.");
//Console.WriteLine();










//Console.WriteLine("========================FILE STREAM READER===============================");
//using (FileStream fs = new FileStream(path3, FileMode.Open, FileAccess.Read))
//{
//    byte[] data1 = new byte[fs.Length];
//    fs.Read(data1, 0, data1.Length);
//    string text1 = Encoding.UTF8.GetString(data1);
//    Console.WriteLine(text1);
//}

//Console.WriteLine();











Console.WriteLine("========================LAZY FILE READLINES============================");

IEnumerable<string> lazyLines = File.ReadLines(path2);
foreach (string l in lazyLines)
{
    Console.WriteLine($"{l}");
}
Console.WriteLine();
