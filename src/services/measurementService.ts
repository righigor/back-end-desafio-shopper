import { z } from "zod";
import {
  confirmMeasureSchema,
  measureSchema,
} from "../validations/measurementValidation";
import MeasurementModel from "../models/measurementModel";
import checkMeasurementInSameMonth from "../utils/checkMeasurementInSameMonth";
import {
  ConfirmMeasurementTypeBody,
  ListMeasurementTypeBody,
  MeasurementTypeBody,
} from "../types/measurementType";
import { verifyCustomerCode } from "../utils/verifyCustomerCode";
import { verifyMeasureUUID } from "../utils/verifyMeasureUUID";
import { isMeasurementConfirmed } from "../utils/isMeasurementConfirmed";

export default class MeasurementService {
  async createMeasurement(obj: MeasurementTypeBody) {
    try {
      const validateData = measureSchema.parse(obj);

      const validateMonth = await checkMeasurementInSameMonth(
        validateData.measure_datetime,
        validateData.customer_code,
        validateData.measure_type
      );

      if (!validateMonth) {
        return {
          status: "CONFLICT",
          data: {
            error_code: "DOUBLE_REPORT",
            error_description: "Leitura do mês já realizada",
          },
        };
      }

      const validCustomerCode = await verifyCustomerCode(
        validateData.customer_code
      );
      if (!validCustomerCode) {
        return {
          status: "BAD_REQUEST",
          data: {
            error_code: "INVALID_DATA",
            error_description: "Código de cliente inválido",
          },
        };
      }
      const measurementModel = new MeasurementModel();
      const { data } = await measurementModel.createMeasurement({
        image: validateData.image,
        customerCode: validateData.customer_code,
        measureDatetime: validateData.measure_datetime,
        measureType: validateData.measure_type,
      });

      return { status: "SUCCESS", data };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          status: "BAD_REQUEST",
          data: {
            error_code: "INVALID_DATA",
            error_description: error.errors
              .map((error) => error.message)
              .join(", "),
          },
        };
      }
      return {
        status: "INTERNAL_SERVER_ERROR",
        data: {
          error_code: "INTERNAL_SERVER_ERROR",
          error_description: "Erro interno no servidor",
        },
      };
    }
  }

  async confirmMeasurement(obj: ConfirmMeasurementTypeBody) {
    try {
      const validateData = confirmMeasureSchema.parse(obj);
      const validMeasureUUID = await verifyMeasureUUID(
        validateData.measure_uuid
      );
      if (!validMeasureUUID) {
        return {
          status: "NOT_FOUND",
          data: {
            error_code: "MEASURE_NOT_FOUND",
            error_description: "Nenhuma leitura encontrada",
          },
        };
      }

      const isConfirmed = await isMeasurementConfirmed(
        validateData.measure_uuid
      );
      if (isConfirmed) {
        return {
          status: "CONFLICT",
          data: {
            error_code: "CONFIRMATION_DUPLICATE",
            error_description: "Leitura do mês já realizada",
          },
        };
      }
      const measurementModel = new MeasurementModel();
      const { data } = await measurementModel.confirmMeasurement({
        measureUUID: validateData.measure_uuid,
        confirmedValue: validateData.confirmed_value,
      });

      return { status: "SUCCESS", data };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          status: "BAD_REQUEST",
          data: {
            error_code: "INVALID_DATA",
            error_description: error.errors
              .map((error) => error.message)
              .join(", "),
          },
        };
      }
      return {
        status: "INTERNAL_SERVER_ERROR",
        data: {
          error_code: "INTERNAL_SERVER_ERROR",
          error_description: "Erro interno no servidor",
        },
      };
    }
  }

  async listMeasurement(obj: ListMeasurementTypeBody) {
    const measurementModel = new MeasurementModel();

    const { data } = await measurementModel.listMeasurement({
      customerCode: obj.customer_code,
      measureType: obj.measure_type,
    });
    return { status: "SUCCESS", data };
  }
}
