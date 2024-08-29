import { prisma } from "../lib/prisma";

export const verifyMeasureUUID = async (measure_uuid: string) => {
  const measure = await prisma.measurement.findFirst({
    where: {
      measureUUID: measure_uuid,
    },
  });
  return !!measure;
};
