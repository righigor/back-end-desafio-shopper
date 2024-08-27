import { FastifyInstance } from "fastify";
import CustomerController from "../controllers/customerController";

const customerController = new CustomerController();

async function customerRoute(fastify: FastifyInstance) {
  fastify.post("/customer", customerController.createCustomer);

  fastify.get("/customer", customerController.getAllCustomer);

  fastify.get("/customer/:id", customerController.getCustomerById);
}

export default customerRoute;
