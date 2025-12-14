import express from "express";
import auth from "../middlewares/authMiddleware.js";
import { onlyAdmin } from "../middlewares/roleMiddleware.js";
import controller from "../controllers/adminController.js";

const r = express.Router();

// Listar administradores
r.get("/", auth, onlyAdmin, controller.listar);

// Criar administrador
r.post("/", auth, onlyAdmin, controller.criar);

// Deletar administrador
r.delete("/:id", auth, onlyAdmin, controller.deletar);

export default r;
