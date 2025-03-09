import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fs from "fs";

const server = fastify();

await server.register(fastifyCors, { origin: "*" });

const filePath = "./src/data.json";

function readData() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

server.get("/projects", async (request, reply) => {
    const data = readData();

    reply.send(data.projects);
});

server.get("/categories", async (request, reply) => {
    const data = readData();
    reply.send(data.categories);
});

server.post("/projects", async (request, reply) => {
    const { name, budget, category } = request.body;

    let data = readData();

    data.projects.push({ name, budget, category });
    writeData(data);

    reply.send({ name, budget, category });
});

server.listen({ port: 3000 }, () => {
    console.log("Servidor rodando na porta 3000");
});
