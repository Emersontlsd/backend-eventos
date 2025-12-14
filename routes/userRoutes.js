import express from 'express';
import userController from '../controllers/userController.js';
import auth from '../middlewares/authMiddleware.js';

const r = express.Router();

// Atualizar dados do usuário
r.put('/:id', auth, userController.update);

export default r;
