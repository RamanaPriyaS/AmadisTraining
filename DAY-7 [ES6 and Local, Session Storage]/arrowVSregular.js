//"this" in regular function refers to the object it is defined in,
const obj={
    name:"ABCD",
    greet: function(){
        console.log("Hello "+this.name);
    }   
};
obj.greet();
 

// "this" in arrow function does not refer to the object it is defined in, 
const obj1={
    name:"ABCD",
    greet: ()=>{    
        console.log("Hello "+this.name);
    }   
};
obj1.greet();
