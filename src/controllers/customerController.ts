import { FastifyReply, FastifyRequest } from "fastify";
import CustomerService from "../services/customerService";
import mapHttp from "../utils/mapHttp";
import { CustomerType } from "../types/customerType";

export default class CustomerController {
  async createCustomer(request: FastifyRequest, reply: FastifyReply) {
    const name = request.body as CustomerType;
    const customerService = new CustomerService();
    const { status, data } = await customerService.createCustomer(name);

    return reply.status(mapHttp(status)).send(data);
  }

  async getAllCustomer(request: FastifyRequest, reply: FastifyReply) {
    const customerService = new CustomerService();
    const { status, data } = await customerService.getAllCustomer();

    return reply.status(mapHttp(status)).send(data);
  }

  async getCustomerById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const customerService = new CustomerService();
    const { status, data } = await customerService.getCustomerById(Number(id));

    return reply.status(mapHttp(status)).send(data);
  }
}