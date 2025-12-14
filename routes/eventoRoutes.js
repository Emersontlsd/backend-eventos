import express from "express";
import eventoController from "../controllers/eventoController.js";

const r = express.Router();

r.get("/", eventoController.listar);
r.get("/:id", eventoController.buscarPorId);
r.post("/", eventoController.criar);
r.put("/:id", eventoController.atualizar);
r.delete("/:id", eventoController.deletar);

// rotas de participantes
r.post("/:id/participantes", eventoController.addParticipant);
r.delete("/:id/participantes/:participantId", eventoController.removeParticipant);

export default r;
