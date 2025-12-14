import express from "express";
import controller from "../controllers/relatorioController.js";
import auth, { onlyAdmin } from "../middlewares/authMiddleware.js";

const r = express.Router();

r.get("/eventos", auth, onlyAdmin, controller.eventos);

export default r;
