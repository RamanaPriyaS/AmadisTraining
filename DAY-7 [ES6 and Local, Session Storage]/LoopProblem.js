//Use var  to create a loop that shares the same scope for each iteration of the loop
for (var i=0; i < 10; i++) {
    setTimeout(() => console.log(i),1000);
}

//Use let to create a loop which creates a new scope for each iteration of the loop
for (let j=0; j < 10; j++) {
    setTimeout(() => console.log(j),1000);
}
    