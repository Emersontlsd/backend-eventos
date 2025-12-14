import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "../config/db.js";

import authRoutes from "../routes/authRoutes.js";
import eventoRoutes from "../routes/eventoRoutes.js";
import participanteRoutes from "../routes/participanteRoutes.js";
import ingressoRoutes from "../routes/ingressoRoutes.js";
import relatorioRoutes from "../routes/relatorioRoutes.js";
import userRoutes from "../routes/userRoutes.js";

import participanteImageRoutes from "../routes/participanteImageRoutes.js";
import userImageRoutes from "../routes/userImageRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ conecta sem top-level await
connectDB();

// 🔥 TODAS as rotas com /api
app.use("/api/auth", authRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/participantes", participanteRoutes);
app.use("/api/ingressos", ingressoRoutes);
app.use("/api/relatorios", relatorioRoutes);
app.use("/api/usuarios", userRoutes);

// uploads
app.use("/api/participantes/imagem", participanteImageRoutes);
app.use("/api/usuarios/imagem", userImageRoutes);

// health check
app.get("/api", (req, res) => {
  res.json({
    ok: true,
    env: process.env.NODE_ENV || "production",
  });
});

export default app;
