import { prisma } from "../lib/prisma";
import {
  ConfirmMeasurementTypeDB,
  ListMeasurementTypeDB,
  MeasurementTypeDB,
} from "../types/measurementType";
import { fileManager, model } from "../utils/integrationGemini";

export default class MeasurementModel {
  async createMeasurement({
    image,
    customerCode,
    measureDatetime,
    measureType,
  }: MeasurementTypeDB) {
    const imgUrl = await fileManager.uploadFile(image, {
      mimeType: "image/png",
      displayName: "measurement",
    });
    const measureValue = await model.generateContent([
      {
        fileData: {
          fileUri: imgUrl.file.uri,
          mimeType: imgUrl.file.mimeType,
        }
      },
      {
        text:  `
        Você recebeu uma imagem contendo um medidor de água ou gás. Seu objetivo é extrair o número visível no medidor. 
  
        Instruções:
        1. Identifique a área da imagem que contém o número do medidor. O medidor pode ser digital ou analógico.
        2. Se for um medidor digital, extraia o número exibido no display.
        3. Se for um medidor analógico, leia os números a partir do mostrador e converta-os para um número legível.
        4. Retorne o número extraído como uma string.
        5. Se não for possível ler o número devido à qualidade da imagem, retorne uma mensagem de erro indicando a falha.
  
        Considerações:
        - Lide com variações na iluminação e ângulos da imagem.
        - Garanta a precisão da leitura, mesmo em imagens de baixa qualidade.
      `
      }
    ])

    const result = await prisma.measurement.create({
      data: {
        measureValue: Number(measureValue),
        imageUrl: imgUrl.file.uri,
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
