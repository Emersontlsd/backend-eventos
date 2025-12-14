import express from "express";
import adminController from "../controllers/adminController.js";
import auth from "../middlewares/authMiddleware.js";
import { onlyAdmin } from "../middlewares/roleMiddleware.js";

const r = express.Router();

r.post("/criar", auth, onlyAdmin, adminController.criarAdmin);
r.get("/", auth, onlyAdmin, adminController.listarAdmins);

export default r;
