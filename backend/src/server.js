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

server.get("/projects/:id", async (request, reply) => {
    const { id } = request.params;
    const data = readData();

    const project = data.projects.find((project) => project.id === id);

    if (!project) {
        return reply.status(404).send({ message: "Projeto não encontrado" });
    }

    reply.send(project);
});

server.get("/categories", async (request, reply) => {
    const data = readData();
    reply.send(data.categories);
});

server.post("/projects", async (request, reply) => {
    const { name, budget, category, cost, services } = request.body;

    let data = readData();

    data.projects.push({ id: uuidv4(), name, budget, category, cost, services });
    writeData(data);

    reply.send({ name, budget, category });
});

server.patch("/projects/:id", async (request, reply) => {
    const { id } = request.params;
    const { nome, budget, category } = request.body;

    let data = readData();

    const project = data.projects.find((project) => project.id === id);

    if (!project) {
        return reply.status(404).send({ message: "Projeto não encontrado" });
    }

    if (nome) project.name = nome;
    if (budget) project.budget = budget;
    if (category) project.category = category;

    writeData(data);

    reply.send(project);
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
