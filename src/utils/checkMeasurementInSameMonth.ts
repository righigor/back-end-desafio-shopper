import { endOfMonth, parseISO, startOfMonth } from "date-fns";
import { prisma } from "../lib/prisma";


export default async function checkMeasurementInSameMonth(
  measure_datetime: string,
  customer_code: string,
  measure_type: string
) {
  const date = parseISO(measure_datetime);
  const startOfMonthDate = startOfMonth(date);
  const endOfMonthDate = endOfMonth(date);
  const existingMeasurement = await prisma.measurement.findFirst({
    where: {
      measureDatetime: {
        gte: startOfMonthDate,
        lte: endOfMonthDate,
      },
      measureType: measure_type.toUpperCase(),
      customerCode: customer_code,
    },
  });
  return existingMeasurement === null ? true : false;
}
