const Fastify = require("fastify");
const app = Fastify({ logger: true });

// app.get('/', async () => {
//     return "App.js says HELLO!";
// });

// app.get('/hi', async (request, reply) => {
//     await reply.send("WELCOME TO FASTIFY!");
// });

// app.get("/print", async (request,reply) => {
//     return({
//         "company":"Amadis",
//         "location":"India"
//     })
// });

// app.get("/contact", async (request, reply) => {
//     return({
//         email:"abcxyz@gmail.com",
//         Phone:"7339668781"
//     })
// });

 app.post("/student", async (req, res) => {
     const student=req.body;
     console.log(student);
     return "Student added successfully.";
 });

app.put("/student", async (req, res) => {
    const student=req.body;
    console.log(student);
    return "Student updated successfully.";
})
app.delete("/student", async (req, res) => {
    await res.send("Student deleted successfully.");
});

app.get("/test", async (request, reply) => {
    return ([request.method,request.url,request.query,request.headers]);
});

app.get("/success", async (request, reply) => {
    reply.code(207).send("Success");
});

app.get("/calculate", async (request, reply) => {
    const a = Number(request.query.a);
    const b = Number(request.query.b);
    const sum = a + b;
    return sum;
});

app.get("/search/:category", async (request, reply) => {
    const a = request.params.category;
    return ("Showing "+ request.params.category )
});

app.post("/feedback", async (request, reply) => {
    const { rating, comment } = request.body;
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    return "Thanks";
});

app.get("/grade", async (request, reply) => {
    const marks = Number(request.query.marks);
    if (marks > 90) {
        return "A";
    } else if (marks >= 80 && marks <= 89) {
        return "B";
    } else if (marks >= 70 && marks <= 79) {
        return "C";
    } else {
        return "Fail";
    }
});

app.listen({ port: 3000 });