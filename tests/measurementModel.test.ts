import { jest } from '@jest/globals';
import MeasurementModel from '../src/models/measurementModel';
import { prisma } from '../src/lib/prisma';
import { confirmMeasurementMock, listMeasurementReturnMock, listMeasurementRequestMock } from './mocks/measurementMock';

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    measurement: {
      update: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('MeasurementModel', () => {
  let measurementModel: MeasurementModel;

  beforeEach(() => {
    measurementModel = new MeasurementModel();
  });

  it('should confirm a measurement', async () => {
    // Mocking the Prisma update method
    (prisma.measurement.update as jest.Mock).mockResolvedValue({} as never);

    // Act
    const result = await measurementModel.confirmMeasurement(confirmMeasurementMock);

    // Assert
    expect(prisma.measurement.update).toHaveBeenCalledWith({
      where: { measureUUID: confirmMeasurementMock.measureUUID },
      data: { confirmedValue: confirmMeasurementMock.confirmedValue, hasConfirmed: true },
    });
    expect(result).toEqual({ data: { success: true } });
  });

  it('should list measurements', async () => {
    // Mocking the Prisma findMany method
    (prisma.measurement.findMany as jest.Mock).mockResolvedValue([
      {
        customerCode: listMeasurementReturnMock.customer_code,
        measureUUID: listMeasurementReturnMock.measurements[0].measure_uuid,
        measureDatetime: listMeasurementReturnMock.measurements[0].measure_datetime,
        measureType: listMeasurementReturnMock.measurements[0].measure_type,
        hasConfirmed: listMeasurementReturnMock.measurements[0].has_confirmed,
        imageUrl: listMeasurementReturnMock.measurements[0].image_url,
      },
      {
        customerCode: listMeasurementReturnMock.customer_code,
        measureUUID: listMeasurementReturnMock.measurements[1].measure_uuid,
        measureDatetime: listMeasurementReturnMock.measurements[1].measure_datetime,
        measureType: listMeasurementReturnMock.measurements[1].measure_type,
        hasConfirmed: listMeasurementReturnMock.measurements[1].has_confirmed,
        imageUrl: listMeasurementReturnMock.measurements[1].image_url,
      },
    ] as never);

    // Act
    const result = await measurementModel.listMeasurement(listMeasurementRequestMock);

    // Assert
    expect(prisma.measurement.findMany).toHaveBeenCalledWith({
      where: { customerCode: listMeasurementRequestMock.customerCode, measureTypeId: listMeasurementRequestMock.measureType },
      select: {
        customerCode: true,
        measureUUID: true,
        measureDatetime: true,
        measureType: true,
        hasConfirmed: true,
        imageUrl: true,
      },
    });
    expect(result).toEqual({ data: listMeasurementReturnMock });
  });
});
