import { jest } from '@jest/globals';
import CustomerService from '../src/services/customerService';
import CustomerModel from '../src/models/customerModel';
import {
  createUserReturnMock,
  createUserRequestMock,
  createGetAllUserReturnMock,
  createUserRequestWithoutNameMock
} from './mocks/customerMock';

jest.mock('../src/models/customerModel');

describe('CustomerService', () => {
  let customerService: CustomerService;

  beforeEach(() => {
    customerService = new CustomerService();
  });

  it('should create a customer successfully', async () => {
    (CustomerModel.prototype.createCustomer as jest.Mock).mockResolvedValue({ data: createUserReturnMock } as never);

    const result = await customerService.createCustomer(createUserRequestMock);

    expect(result).toEqual({ status: 'CREATED', data: createUserReturnMock });
    expect(CustomerModel.prototype.createCustomer).toHaveBeenCalledWith(createUserRequestMock);
  });

  it('should return a bad request error if name is not provided', async () => {
    const result = await customerService.createCustomer(createUserRequestWithoutNameMock);

    expect(result).toEqual({
      status: 'BAD_REQUEST',
      data: { message: "O campo 'name' é obrigatório e não pode estar vazio." }
    });
  });

  it('should return all customers successfully', async () => {
    (CustomerModel.prototype.getAllCustomer as jest.Mock).mockResolvedValue({ data: createGetAllUserReturnMock } as never);

    const result = await customerService.getAllCustomer();

    expect(result).toEqual({ status: 'SUCCESS', data: createGetAllUserReturnMock });
    expect(CustomerModel.prototype.getAllCustomer).toHaveBeenCalled();
  });

  it('should return a customer by id successfully', async () => {
    const customerId = 3;
    (CustomerModel.prototype.getCustomerById as jest.Mock).mockResolvedValue({ data: createUserReturnMock } as never);

    const result = await customerService.getCustomerById(customerId);

    expect(result).toEqual({ status: 'SUCCESS', data: createUserReturnMock });
    expect(CustomerModel.prototype.getCustomerById).toHaveBeenCalledWith(customerId);
  });
});
