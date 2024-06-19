
import { fetchLeads } from "../controller/amoCRMController";
import { FastifyInstance, } from "fastify";

module.exports = function defaultRoutes(fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.get("/leads", fetchLeads);

  done();
}
