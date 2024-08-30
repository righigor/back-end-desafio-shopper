import { jest } from '@jest/globals';
import Fastify, { FastifyInstance } from 'fastify';
import CustomerController from '../src/controllers/customerController';
import CustomerService from '../src/services/customerService';
import { createUserReturnWithNoDateMock, createGetAllUserReturnWithNoDateMock } from './mocks/customerMock';

jest.mock('../src/services/customerService');

const customerController = new CustomerController();

const build = () => {
  const fastify = Fastify();
  
  fastify.post('/customers', (request, reply) => customerController.createCustomer(request, reply));
  fastify.get('/customers', (request, reply) => customerController.getAllCustomer(request, reply));
  fastify.get('/customers/:id', (request, reply) => customerController.getCustomerById(request, reply));
  
  return fastify;
};

describe('CustomerController', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = build();
    await fastify.listen({ port: 0 }); // Open port dynamically
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should return a bad request error if name is not provided', async () => {
    (CustomerService.prototype.createCustomer as jest.Mock).mockResolvedValue({
      status: 'BAD_REQUEST',
      data: { message: "O campo 'name' é obrigatório e não pode estar vazio." }
    } as never);

    const response = await fastify.inject({
      method: 'POST',
      url: '/customers',
      payload: { name: '' }
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({
      message: "O campo 'name' é obrigatório e não pode estar vazio."
    });
  });

  it('should create a customer successfully', async () => {
    (CustomerService.prototype.createCustomer as jest.Mock).mockResolvedValue({
      status: 'CREATED',
      data: createUserReturnWithNoDateMock
    } as never);

    const response = await fastify.inject({
      method: 'POST',
      url: '/customers',
      payload: { name: 'igor goncalves' }
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual(createUserReturnWithNoDateMock);
  });

  it('should return all customers', async () => {
    (CustomerService.prototype.getAllCustomer as jest.Mock).mockResolvedValue({
      status: 'SUCCESS',
      data: createGetAllUserReturnWithNoDateMock
    } as never);

    const response = await fastify.inject({
      method: 'GET',
      url: '/customers'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(createGetAllUserReturnWithNoDateMock);
  });

  it('should return a customer by id', async () => {
    (CustomerService.prototype.getCustomerById as jest.Mock).mockResolvedValue({
      status: 'SUCCESS',
      data: createUserReturnWithNoDateMock
    } as never);

    const response = await fastify.inject({
      method: 'GET',
      url: '/customers/3'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(createUserReturnWithNoDateMock);
  });
});
