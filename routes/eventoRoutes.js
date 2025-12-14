import express from "express";
import eventoController from "../controllers/eventoController.js";

const r = express.Router();

// CRUD de eventos
r.get("/", eventoController.listar);
r.post("/", eventoController.criar);
r.delete("/:id", eventoController.deletar);
r.get("/:id", eventoController.buscarPorId);

// Adicionar participante
r.post("/:idEvento/participantes/:idParticipante", eventoController.adicionarParticipante);

export default r;
