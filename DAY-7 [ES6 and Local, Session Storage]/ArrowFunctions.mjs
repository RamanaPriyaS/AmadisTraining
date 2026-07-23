//Regular function
export default function sayHI(){
    console.log("Hello");
}
sayHI();

//Arrow function
const sayHello=()=>{
    console.log("Hello");
}
sayHello();

//Arrow function with single parameters
const square=num => num*num;
console.log(square(12));

//Arrow function with multiple parameters
const add=(a,b)=> a+b;
console.log(add(5,10));

//Arrow function with no parameters
const greet=()=> console.log("Hello");
greet();

//Arrow function with block body
const CalculateTotal=(price,tax) => {
    const total=price+price*tax;
    return total;
}
console.log("Function with block body : " + CalculateTotal(100,0.1));

//Uses in map, filter, reduce
const numbers=[1,2,3,4,5];
const squaredNumbers=numbers.map(num => num*num);
console.log("Map"+squaredNumbers);    

const evenNumbers=numbers.filter(num => num%2===0);
console.log("Filter"+evenNumbers);

const sum=numbers.reduce((acc,num)=> acc+num,0);
console.log("Reduce"+sum);