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
import adminRoutes from "./routes/adminRoutes.js";
import participanteImageRoutes from './routes/participanteImageRoutes.js';
import userImageRoutes from './routes/userImageRoutes.js';

const app = express();

// 🔧 CORS configurado para frontend Vercel + localhost
const allowedOrigins = [
  "https://plataforma-eventos-bay.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // Postman ou server-to-server
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `Acesso bloqueado pelo CORS: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

// garante que o preflight seja respondido
app.options("*", cors());

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
app.use("/admins", adminRoutes);

// rotas de upload de imagem
app.use('/participantes/imagem', participanteImageRoutes);
app.use('/usuarios/imagem', userImageRoutes);

// health check
app.get("/", (req, res) => {
  res.json({ status: "API online" });
});

// porta
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
