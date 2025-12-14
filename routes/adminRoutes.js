import express from "express";
import adminController from "../controllers/adminController.js";
import auth from "../middlewares/authMiddleware.js";
import { onlyAdmin } from "../middlewares/roleMiddleware.js";

const r = express.Router();

// Somente admins podem listar, criar ou deletar outros admins
r.get("/", auth, onlyAdmin, adminController.listar);
r.post("/", auth, onlyAdmin, adminController.criar);
r.delete("/:id", auth, onlyAdmin, adminController.deletar);

export default r;
