import { FastifyInstance } from "fastify";
import MeasureTypeController from "../controllers/measureTypeController";

const measureTypeController = new MeasureTypeController();

async function measureTypeRoute(fastify: FastifyInstance) {
  fastify.post("/measure-type", measureTypeController.createMeasureType);

  fastify.get("/measure-type", measureTypeController.getMeasureType);
}

export default measureTypeRoute;