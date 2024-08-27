import { MeasureType } from "../types/measureType";
import { prisma } from "../lib/prisma";


export default class MeasureTypeModel {
  async createMeasureType({ type }: MeasureType) {
    const result = await prisma.measureType.create({
      data: {
        type
      },
    });

    return { data: result };
  }

  async getMeasureType() {
    const result = await prisma.measureType.findMany();
    console.log(result);
    return { data: result };
  }
}