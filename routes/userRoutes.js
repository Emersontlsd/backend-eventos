import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";

const r = express.Router();

r.put("/:id", auth, userController.update);

export default r;
