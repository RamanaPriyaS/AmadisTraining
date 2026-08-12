using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AmadisIRM.Farm
{
     class Animal
        {
            public string Name;
            public string OwnerName;
            public void DisplayAnimals(string Name, string ownerName)
            {
                Console.WriteLine($"Pet Name : {Name}, Owner Name - {ownerName}");
            }
        }
}
