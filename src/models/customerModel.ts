import { v4 as uuidv4 } from "uuid";
import { CustomerReturnType, CustomerType } from "../types/customerType";
import { prisma } from "../lib/prisma";

export default class CustomerModel {
  async createCustomer({ name }: CustomerType): Promise<{ data: CustomerReturnType }> {
    const customerCode = uuidv4();
    const result = await prisma.customer.create({
      data: {
        name,
        customerCode,
      },
    });

    return { data: result };
  }

  async getAllCustomer() {
    const result = await prisma.customer.findMany();

    return { data: result };
  }

  async getCustomerById(id: number) {
    const result = await prisma.customer.findUnique({
      where: {
        id,
      },
    });
    return { data: result };
  }
}
