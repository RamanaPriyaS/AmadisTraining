using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AmadisIRM.Zoo
{
         class Animal
           {
            public string Species;
            public string Habitat;

            public void DisplayAnimals(string species, string habitat)
            {
                Console.WriteLine($"SPECIES : {species}, Habitat - {habitat}");
            }
        }
}
