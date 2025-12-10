import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import eventoRoutes from './routes/eventoRoutes.js';
import participanteRoutes from './routes/participanteRoutes.js';
import ingressoRoutes from './routes/ingressoRoutes.js';
import relatorioRoutes from './routes/relatorioRoutes.js';
import userRoutes from './routes/userRoutes.js';

import participanteImageRoutes from './routes/participanteImageRoutes.js';
import userImageRoutes from './routes/userImageRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/eventos', eventoRoutes);
app.use('/participantes', participanteRoutes);
app.use('/ingressos', ingressoRoutes);
app.use('/relatorios', relatorioRoutes);
app.use('/usuarios', userRoutes);

// rotas de upload
app.use('/participantes/imagem', participanteImageRoutes);
app.use('/usuarios/imagem', userImageRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Backend rodando na porta ${process.env.PORT}`)
);
