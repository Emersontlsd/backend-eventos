import express from "express";
import auth from "../middlewares/authMiddleware.js";
import { onlyAdmin } from "../middlewares/roleMiddleware.js";
import controller from "../controllers/adminController.js";

const r = express.Router();

r.get("/", auth, onlyAdmin, controller.listar);
r.post("/", auth, onlyAdmin, controller.criar);
r.delete("/:id", auth, onlyAdmin, controller.deletar);

export default r;
