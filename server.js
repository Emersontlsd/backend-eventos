import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// carregar variáveis do env.js
import { ENV } from "./config/env.js";

process.env.MONGO_URI = ENV.MONGO_URI;
process.env.JWT_SECRET = ENV.JWT_SECRET;
process.env.CLOUDINARY_CLOUD_NAME = ENV.CLOUDINARY_CLOUD_NAME;
process.env.CLOUDINARY_API_KEY = ENV.CLOUDINARY_API_KEY;
process.env.CLOUDINARY_API_SECRET = ENV.CLOUDINARY_API_SECRET;

// IMPORTS DAS ROTAS
import authRoutes from './routes/authRoutes.js';
import eventoRoutes from './routes/eventoRoutes.js';
import participanteRoutes from './routes/participanteRoutes.js';
import ingressoRoutes from './routes/ingressoRoutes.js';
import relatorioRoutes from './routes/relatorioRoutes.js';
import userRoutes from './routes/userRoutes.js';

import participanteImageRoutes from './routes/participanteImageRoutes.js';
import userImageRoutes from './routes/userImageRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// conectar MongoDB
connectDB();

// rotas principais
app.use('/auth', authRoutes);
app.use('/eventos', eventoRoutes);
app.use('/participantes', participanteRoutes);
app.use('/ingressos', ingressoRoutes);
app.use('/relatorios', relatorioRoutes);
app.use('/usuarios', userRoutes);

// rotas de upload de imagem
app.use('/participantes/imagem', participanteImageRoutes);
app.use('/usuarios/imagem', userImageRoutes);

// porta local
const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
  res.json({ status: "API online" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
