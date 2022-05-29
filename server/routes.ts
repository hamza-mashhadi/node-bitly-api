import { Application } from "express";
import examplesRouter from "./api/controllers/shortLinks/router";
export default function routes(app: Application): void {
  app.use("/api/v1/", examplesRouter);
}
