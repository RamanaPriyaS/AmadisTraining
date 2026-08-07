import Fastify from "fastify";
import jwt from "@fastify/jwt";
import bcrypt from "bcrypt";    

const app = Fastify({
    logger: true
});

// app.addHook("onRequest", async (request, reply) => {

//     const apiKey = request.headers["x-api-key"];
//     if (apiKey !== "12345") {
//         return reply.code(401).send({
//             message: "Invalid API KEY"
//         });
//     }
// });

// app.addHook("onRequest", async (request, reply) => {

//     console.log("------------ New Request ------------");
//     console.log("Method :", request.method);
//     console.log("URL    :", request.url);
//     console.log("Time   :", new Date().toLocaleString());
//     console.log("IP     :", request.ip);
//     console.log("-------------------------------------");

// });

// app.addHook("onRequest", async (request, reply) => {

//     const ip = request.ip;

//     if (ip !== "127.0.0.0") {
//          reply.code(403).send({
//             message: "Access allowed only from office network."
//         });
//     }

// });

// app.get("/profile", async () => {
//     return {
//         name: "Ram",
//         age: 23
//     };
// });

// app.addHook("preValidation", async (request) => {
//     request.body.name = request.body.name.toLowerCase().trim();
//     request.body.email = request.body.email.toLowerCase();
//         console.log(request.body);
// });

// app.post("/register", {
//     schema: {
//         body: {
//             type: "object",
//             required: ["name", "email"],
//             properties: {
//                 name: { type: "string" },
//                 email: { type: "string" }
//             }
//         }
//     }
// }, async (request) => {
//     return request.body;
// });

// app.addHook("preHandler", async (request, reply) => {

//     // const token = request.headers.authorization;

//     // if (token !== "Bearer abc123") {

//     //     return reply.code(401).send({
//     //         message: "Please login first."
//     //     });
//     // }
//      request.user = {
//         id: 1,
//         name: "Ramana",
//         accountStatus: "ACTIVE"
//     };

//     if (request.user.accountStatus !== "ACTIVE") {
//         return reply.code(403).send({
//             message: "Your account is blocked."
//         });
//     }
// });
// app.post("/orders", async (request) => {

//     return {
//         message: "Order Placed Successfully",
//         customer: request.user.name
//     };

// });

// await app.register(jwt, {
//     secret: "mysecretkey"
// });
// app.post("/login", async (request, reply) => {

//     const user = {
//         id: 1,
//         name: "Ram"
//     };
//     const token = app.jwt.sign(user);
//     return {
//         token
//     };
// });

app.decorate("hashPassword", async (password) => {
    return await bcrypt.hash(password, 10);
});

app.post("/register", async (request) => {
    const hash = await app.hashPassword(request.body.password);
    return { hash};
});

app.listen({ port: 3000 });