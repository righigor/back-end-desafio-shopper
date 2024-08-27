
import { FastifyReply, FastifyRequest } from "fastify";
import MeasureTypeService from "../services/measureTypeService";
import { MeasureType } from "../types/measureType";
import mapHttp from "../utils/mapHttp";

export default class MeasureTypeController {
  async createMeasureType(request: FastifyRequest, reply: FastifyReply) {
    const obj = request.body as MeasureType;
    const measureTypeService = new MeasureTypeService();
    console.log(obj);
    const { status, data } = await measureTypeService.createMeasureType(obj);

    return reply.code(mapHttp(status)).send(data);
  }

  async getMeasureType(request: FastifyRequest, reply: FastifyReply) {
    const measureTypeService = new MeasureTypeService();
    const { status, data } = await measureTypeService.getMeasureType();

    return reply.code(mapHttp(status)).send(data);
  }
}