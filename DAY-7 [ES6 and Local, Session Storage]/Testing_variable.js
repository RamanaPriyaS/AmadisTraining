// Declare a variable using var
var  area=5;
function triangle(){
    let height=5,base=10;
    var area=height*base;
    console.log("Area inside triangle function:", area);
}
var area=10;
console.log("Value of area outside triangle function:", area);
triangle()
console.log("Value of area after triangle function call:", area);

//Redeclare a variable using let
let number=10;
function add(){
    let number=5;
    console.log("Value of number inside add function:", number);
}
console.log("Value of number outside add function:", number);
add()

// Declare a variable using let,var
let area1=5;
function rectangle(){
    let length=10,breadth=5;
    var area1=length*breadth;
    console.log("Area inside rectangle function:", area1);
}
console.log("Value of area outside rectangle function:", area1);
rectangle()
console.log("Value of area after rectangle function call:", area1);


// Reassign a variable using var
var area2=15;
function square(){
    let side=5;
    area2=side*side;
    console.log("Area inside square function:", area2);
}
console.log("Value of area outside square function:", area2);
square()
console.log("Value of area after square function call:", area2);