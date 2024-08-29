import { FastifyInstance } from "fastify";
import MeasurementController from "../controllers/measurementController";

const measurementController = new MeasurementController();

export default async function measurementRoute(fastify: FastifyInstance) {
  fastify.post("/upload", measurementController.createMeasurement);

  fastify.patch("/confirm", measurementController.confirmMeasurement);

  fastify.get("/:customer_code/list", measurementController.listMeasurement);
}