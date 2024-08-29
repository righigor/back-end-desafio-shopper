import { prisma } from "../lib/prisma";
import {
  ConfirmMeasurementTypeDB,
  ListMeasurementTypeDB,
  MeasurementTypeDB,
} from "../types/measurementType";

export default class MeasurementModel {
  async createMeasurement({
    image,
    customerCode,
    measureDatetime,
    measureType,
  }: MeasurementTypeDB) {
    const measureValue = 0; // GERADO PELA IA
    const imgUrl = "string"; // GERADO PELA IA

    const result = await prisma.measurement.create({
      data: {
        measureValue,
        imageUrl: imgUrl,
        measureDatetime: new Date(measureDatetime),
        measureType: measureType.toUpperCase(),
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

  async listMeasurement({ customerCode, measureType }: ListMeasurementTypeDB) {
    const whereClause = {
      customerCode,
      ...(measureType && { measureTypeId: measureType }),
    }

    const data = await prisma.measurement.findMany({
      where: whereClause,
      select: {
        customerCode: true,
        measureUUID: true,
        measureDatetime: true,
        measureType: true,
        hasConfirmed: true,
        imageUrl: true,
      }
    });

    const result =  {
      customer_code: data[0].customerCode,
      measurements: data.map((item) => ({
        measure_uuid: item.measureUUID,
        measure_datetime: item.measureDatetime,
        measure_type: item.measureType,
        has_confirmed: item.hasConfirmed,
        image_url: item.imageUrl,
      })),
    }

    return { data: result };
  }
}
