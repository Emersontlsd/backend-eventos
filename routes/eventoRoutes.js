import express from "express";
import controller from "../controllers/eventoController.js";
import auth, { onlyAdmin } from "../middlewares/authMiddleware.js";

const r = express.Router();

r.get("/", auth, controller.listar);
r.get("/:id", auth, controller.buscarPorId);
r.post("/", auth, onlyAdmin, controller.criar);
r.put("/:id", auth, onlyAdmin, controller.atualizar);
r.delete("/:id", auth, onlyAdmin, controller.deletar);

export default r;
