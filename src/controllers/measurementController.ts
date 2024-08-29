import { FastifyReply, FastifyRequest } from "fastify";
import { ConfirmMeasurementTypeBody, MeasurementTypeBody } from "../types/measurementType";
import MeasurementService from "../services/measurementService";
import mapHttp from "../utils/mapHttp";

export default class MeasurementController {
  async createMeasurement(request: FastifyRequest, reply: FastifyReply) {
    const obj = request.body as MeasurementTypeBody;
    const measurementService = new MeasurementService();
    const { status, data } = await measurementService.createMeasurement(obj);

    reply.code(mapHttp(status)).send(data);
  }

  async confirmMeasurement(request: FastifyRequest, reply: FastifyReply) {
    const obj = request.body as ConfirmMeasurementTypeBody;
    const measurementService = new MeasurementService();
    const { status, data } = await measurementService.confirmMeasurement(obj);

    reply.code(mapHttp(status)).send(data);
  }

  async listMeasurement(request: FastifyRequest, reply: FastifyReply) {
    const { customer_code } = request.params as { customer_code: string };
    const measure_type = request.query as { measure_type?: string };
    const measurementService = new MeasurementService();
    const { status, data } = await measurementService.listMeasurement({
      customer_code,
      measure_type: measure_type.measure_type,
    });
    reply.code(mapHttp(status)).send(data);
  }
}
