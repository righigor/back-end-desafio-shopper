import { MeasureType } from "../types/measureType";
import MeasureTypeModel from "../models/measureTypeModel";

export default class MeasureTypeService {
  async createMeasureType(type: MeasureType) {
    if (!type) {
      return { status: 'BAD_REQUEST', data: { message: "O campo 'type' é obrigatório e não pode estar vazio."} };
    }
    const measureTypeModel = new MeasureTypeModel();
    const { data } = await measureTypeModel.createMeasureType(type);

    return { status: 'CREATED', data };
  }

  async getMeasureType() {
    const measureTypeModel = new MeasureTypeModel();
    const { data } = await measureTypeModel.getMeasureType();

    return { status: 'SUCCESS', data };
  }
}