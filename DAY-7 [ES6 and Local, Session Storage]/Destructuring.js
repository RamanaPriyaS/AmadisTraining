//Array destructuring
const numbers = [1, 4, 9, 16, 25];
const [square1, , , , square5] = numbers;
const[ first, second, ...rest] = numbers;
console.log(square1); 
console.log(square5); 
console.log(rest);

//Nested array destructuring
const numbers1 = [1, [4, 9], 16, 25];
const [n1, [n2, n3], n4, n5] = numbers1;
console.log(n2);
console.log(n3);

//Swap using array destructuring
let a=5, b=10;
console.log("Before Destructuring :");
console.log("A :",a); 
console.log("B :",b);
[a, b] = [b, a];
console.log("A :",a); 
console.log("B :",b);

//Object destructuring and renaming properties
const person = {
    name: "John",
    age: 30,
    address: {
        city: "New York",
        country: "USA"
    }
};

const { name : personName, age, address: { city, country } } = person;
console.log(personName);
console.log(age);
console.log(city);
console.log(country);

//Shallow copy using object destructuring
const x=[1,2,3];
const y=[...x];
y.push(4);
console.log(x); 
console.log(y);