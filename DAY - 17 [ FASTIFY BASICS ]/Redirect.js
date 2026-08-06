const Fastify = require("fastify");
const app = Fastify({ logger: true });

app.get("/home", async (request, reply) => {
    return "🏠 Welcome to the Home Page!";
});

app.get("/login", async (request, reply) => {
    return "🔐 Please Login First!";
});

app.get("/", async (request, reply) => {

    const isLoggedIn = false;

    if (isLoggedIn) {
        return reply.redirect("/home");
    } else {
        return reply.redirect("/login");
    }

});

app.listen({ port: 3000 });
