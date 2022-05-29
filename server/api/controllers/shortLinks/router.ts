import express from "express";
import controller from "./controller";
export default express
  .Router()
  .post("/", controller.create)
  .get("/stats/:id", controller.getStats)
  .get("/", controller.getAll)
  .get("/:id", controller.getById);