import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

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

    data.projects.push({ id: uuidv4(), name, budget, category });
    writeData(data);

    reply.send({ name, budget, category });
});

server.delete("/projects/:id", async (request, reply) => {
    const { id } = request.params;

    let data = readData();

    data.projects = data.projects.filter((project) => project.id !== id);
    writeData(data);

    reply.send(data);
});

server.listen({ port: 3000 }, () => {
    console.log("Servidor rodando na porta 3000");
});
