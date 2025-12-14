import express from "express";
import controller from "../controllers/ingressoController.js";
import auth from "../middlewares/authMiddleware.js";

const r = express.Router();

r.get("/", auth, controller.listar);
r.get("/evento/:eventoId", auth, controller.listarPorEvento);
r.post("/", auth, controller.criar);
r.put("/:id", auth, controller.atualizar);
r.delete("/:id", auth, controller.deletar);

export default r;
