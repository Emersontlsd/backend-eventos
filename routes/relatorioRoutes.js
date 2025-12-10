import express from 'express';
import controller from '../controllers/relatorioController.js';

const r = express.Router();

r.get('/eventos', controller.eventos);

export default r;
