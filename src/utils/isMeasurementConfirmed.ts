import { prisma } from "../lib/prisma";

export const isMeasurementConfirmed = async (measure_uuid: string) => {
  const measure = await prisma.measurement.findFirst({
    where: {
      measureUUID: measure_uuid,
      hasConfirmed: true,
    },
  });
  return !!measure;
}