import express from 'express';
import controller from '../controllers/ingressoController.js';

const r = express.Router();

r.get('/', controller.listar);
r.get('/evento/:eventoId', controller.listarPorEvento);
r.post('/', controller.criar);
r.put('/:id', controller.atualizar);
r.delete('/:id', controller.deletar);

export default r;
