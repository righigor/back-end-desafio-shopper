import CustomerModel from "../models/customerModel";
import { CustomerType } from "../types/customerType";

export default class CustomerService {
  async createCustomer(name: CustomerType) {
    if (!name) {
      return { status: 'BAD_REQUEST', data: { message: "O campo 'name' é obrigatório e não pode estar vazio."} };
    }
    const customerModel = new CustomerModel();
    const { data } = await customerModel.createCustomer(name);

    return { status: 'CREATED', data };
  }

  async getAllCustomer() {
    const customerModel = new CustomerModel();
    const { data } = await customerModel.getAllCustomer();

    return { status: 'SUCCESS', data };
  }

  async getCustomerById(id: number) {
    const customerModel = new CustomerModel();
    const { data } = await customerModel.getCustomerById(id);

    return { status: 'SUCCESS', data };
  }
}