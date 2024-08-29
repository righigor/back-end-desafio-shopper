import { prisma } from "../lib/prisma";

export const verifyCustomerCode = async (customer_code: string) => {
  const customer = await prisma.customer.findFirst({
    where: {
      customerCode: customer_code
    }
  });

  return !!customer;
}