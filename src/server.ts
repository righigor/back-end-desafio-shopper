import fastify from "fastify";

const app = fastify();
const PORT = process.env.PORT || 3000;

app.get("/", async (request, reply) => {
  return { hello: "world!!!" };
});

app.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
