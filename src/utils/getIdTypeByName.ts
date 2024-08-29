import { prisma } from "../lib/prisma";

export const getIdTypeByName = async (name: string): Promise<number> => {
  const result = await prisma.measureType.findFirst({
    where: {
      type: name.toUpperCase(),
    },
  });
  if (!result) {
    return 0;
  }
  return result.id;
};
