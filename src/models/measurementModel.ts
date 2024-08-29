import { prisma } from "../lib/prisma";
import {
  ConfirmMeasurementTypeDB,
  MeasurementTypeDB,
} from "../types/measurementType";

export default class MeasurementModel {
  async createMeasurement({
    image,
    customerCode,
    measureDatetime,
    measureTypeId,
  }: MeasurementTypeDB) {
    const measureValue = 0; // GERADO PELA IA
    const imgUrl = "string"; // GERADO PELA IA

    const result = await prisma.measurement.create({
      data: {
        measureValue,
        imageUrl: imgUrl,
        measureDatetime: new Date(measureDatetime),
        measureTypeId,
        customerCode,
      },
      select: {
        imageUrl: true,
        measureValue: true,
        measureUUID: true,
      },
    });

    return { data: result };
  }

  async confirmMeasurement({
    measureUUID,
    confirmedValue,
  }: ConfirmMeasurementTypeDB) {
    const result = await prisma.measurement.update({
      where: { measureUUID },
      data: { confirmedValue, hasConfirmed: true },
    });

    return { data: { success: true } };
  }
}
