import { jest } from '@jest/globals';
import CustomerModel from '../src/models/customerModel';
import { prisma } from '../src/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { createUserReturnMock, createUserRequestMock, createGetAllUserReturnMock } from './mocks/customerMock'

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    customer: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('CustomerModel', () => {
  let customerModel: CustomerModel;

  beforeEach(() => {
    customerModel = new CustomerModel();
  });

  it('should create a customer with a generated customer code', async () => {
    const mockUUID = createUserReturnMock.customerCode;

    (uuidv4 as jest.Mock).mockReturnValue(mockUUID);

    (prisma.customer.create as jest.Mock).mockResolvedValue(createUserReturnMock as never);

    const result = await customerModel.createCustomer(createUserRequestMock);

    expect(uuidv4).toHaveBeenCalled();
    expect(prisma.customer.create).toHaveBeenCalledWith({
      data: {
        name: createUserRequestMock.name,
        customerCode: mockUUID,
      },
    });
    expect(result).toEqual({ data: createUserReturnMock });
  });

  it('should return all customers', async () => {
    (prisma.customer.findMany as jest.Mock).mockResolvedValue(createGetAllUserReturnMock as never);

    const result = await customerModel.getAllCustomer();

    expect(prisma.customer.findMany).toHaveBeenCalled();
    expect(result).toEqual({ data: createGetAllUserReturnMock });
  });

  it('should return a customer by id', async () => {
    (prisma.customer.findUnique as jest.Mock).mockResolvedValue(createUserReturnMock as never);

    const result = await customerModel.getCustomerById(3);

    expect(prisma.customer.findUnique).toHaveBeenCalledWith({
      where: {
        id: 3,
      },
    });
    expect(result).toEqual({ data: createUserReturnMock });
  });
});