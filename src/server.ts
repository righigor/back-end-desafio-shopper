import fastify from "fastify";
import dotenv from "dotenv";
import customerRoute from "./routes/customerRoute";
import measurementRoute from "./routes/measurementRoute";

dotenv.config();
const app = fastify();
const PORT = process.env.PORT || 3000;

app.get("/", async (request, reply) => {
  return { hello: "world!!!" };
});

app.register(customerRoute);
app.register(measurementRoute);

app.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
