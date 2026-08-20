//using System.Text.Json;
//string json = "{\"InvoiceNo\": \"INV-01\", \"Total\": 500}";
//var myData = JsonSerializer.Deserialize<Invoice>(json);
//Console.WriteLine(myData.InvoiceNo);
//public class Invoice
//{
//    public string InvoiceNo { get; set; }
//    public double Total { get; set; }
//}

















//using iTextSharp.text;
//using iTextSharp.text.pdf;
//using System.IO;

//Document doc = new Document();

//PdfWriter.GetInstance(doc,
//    new FileStream("Invoice.pdf", FileMode.Create));

//doc.Open();

//doc.Add(new Paragraph("Invoice: INV-10024"));

//doc.Close();













//using iTextSharp.text;
//using iTextSharp.text.pdf;
//using System.IO;

//Document doc = new Document();

//PdfWriter.GetInstance(doc, new FileStream("InvoiceTable.pdf", FileMode.Create));
//doc.Open();

//PdfPTable table = new PdfPTable(3);
//table.WidthPercentage = 100; 
//table.AddCell(new PdfPCell(new Phrase("Item")) { BackgroundColor = BaseColor.LIGHT_GRAY });
//table.AddCell(new PdfPCell(new Phrase("Quantity")) { BackgroundColor = BaseColor.LIGHT_GRAY });
//table.AddCell(new PdfPCell(new Phrase("Price")) { BackgroundColor = BaseColor.LIGHT_GRAY });

//table.AddCell("Widget A");
//table.AddCell("2");
//table.AddCell("$10.00");

//table.AddCell("Widget B");
//table.AddCell("5");
//table.AddCell("$25.00");

//doc.Add(table);

//doc.Close();










//using System.Xml.Linq;
//class Program
//{
//    static void Main()
//    {
//        string xml = @"
//            <Root>
//                <InvoiceNo>INV-01</InvoiceNo>
//            </Root>
//        ";

//        XDocument doc = XDocument.Parse(xml);

//        string no = doc.Root.Element("InvoiceNo").Value;

//        Console.WriteLine(no);
//        Console.ReadLine(); 
//    }
//}