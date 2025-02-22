import fastify from "fastify";
import fastifyCors from "@fastify/cors";

const server = fastify();

await server.register(fastifyCors, { origin: "*" });

server.get("/api/hello", async () => {
    return { message: "Hello World do backend!" };
});

server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`🚀 Server listening at ${address}`);
});
