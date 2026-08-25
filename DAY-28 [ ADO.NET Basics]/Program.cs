
using System.Data;
using Microsoft.Data.SqlClient;

string ConnectionString = "Server=LAPTOP-3TBUJUK6\\SQLEXPRESS;Database=EmployeeDB;Trusted_Connection=True;TrustServerCertificate=True;";

Console.WriteLine("--- SqlConnection ---");
using (SqlConnection conn = new SqlConnection(ConnectionString)) {
    Console.WriteLine($"State before Open: {conn.State}");
    conn.Open();
    Console.WriteLine($"State after Open:  {conn.State}");
    Console.WriteLine($"Server version:    {conn.ServerVersion}");
    Console.WriteLine();
}


Console.WriteLine("--- SqlCommand: ExecuteScalar ---");
using (SqlConnection conn = new SqlConnection(ConnectionString))
using (SqlCommand cmd = new SqlCommand("SELECT COUNT(*) FROM dbo.Employees;", conn))
{
    conn.Open();
    int count = (int)cmd.ExecuteScalar();
    Console.WriteLine($"Employee count: {count}");
}
Console.WriteLine();



Console.WriteLine("--- SqlCommand: ExecuteNonQuery ---");
using (SqlConnection conn = new SqlConnection(ConnectionString))
using (SqlCommand cmd = new SqlCommand("dbo.UpdateEmployeeSalary", conn))
{
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add("@EmployeeId", SqlDbType.Int).Value = 1;
    cmd.Parameters.Add("@NewSalary", SqlDbType.Decimal).Value = 58000.00m;

    conn.Open();
    int rows = cmd.ExecuteNonQuery();
    Console.WriteLine($"Rows updated: {rows}");
}
Console.WriteLine();




Console.WriteLine("--- SqlDataReader: basic loop ---");
using (SqlConnection conn = new SqlConnection(ConnectionString))
using (SqlCommand cmd = new SqlCommand(
    "SELECT EmployeeId, Name, Department, Salary FROM dbo.Employees ORDER BY EmployeeId;", conn))
{
    conn.Open();
    using (SqlDataReader reader = cmd.ExecuteReader())
    {
        int idOrd = reader.GetOrdinal("EmployeeId");
        int nameOrd = reader.GetOrdinal("Name");
        int deptOrd = reader.GetOrdinal("Department");
        int salOrd = reader.GetOrdinal("Salary");

        while (reader.Read())
        {
            int id = reader.GetInt32(idOrd);
            string name = reader.GetString(nameOrd);

            string dept = reader.IsDBNull(deptOrd) ? "(none)" : reader.GetString(deptOrd);
            decimal salary = reader.GetDecimal(salOrd);

            Console.WriteLine($"#{id}: {name} - {dept} - {salary:C}");
        }
    }
}
Console.WriteLine();



Console.WriteLine("--- Parameterized query ---");
int searchId = 2;

using (SqlConnection conn = new SqlConnection(ConnectionString))
using (SqlCommand cmd = new SqlCommand(
    "SELECT Name, Department FROM dbo.Employees WHERE EmployeeId = @EmployeeId;", conn))
{
    cmd.Parameters.Add("@EmployeeId", SqlDbType.Int).Value = searchId;

    conn.Open();
    using (SqlDataReader reader = cmd.ExecuteReader())
    {
        if (reader.Read())
            Console.WriteLine($"Found: {reader["Name"]} - {reader["Department"]}");
        else
            Console.WriteLine("No match.");
    }
}
Console.WriteLine();





