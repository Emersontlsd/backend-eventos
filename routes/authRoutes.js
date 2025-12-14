import express from "express";
import controller from "../controllers/authController.js";
import auth from "../middlewares/authMiddleware.js";

const r = express.Router();

r.post("/registrar", controller.register);
r.post("/login", controller.login);

// atualizar dados do próprio usuário
r.put("/update/:id", auth, controller.update);

export default r;
