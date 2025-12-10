import express from 'express';
import controller from '../controllers/eventoController.js';

const r = express.Router();

r.get('/', controller.listar);
r.get('/:id', controller.buscarPorId);
r.post('/', controller.criar);
r.put('/:id', controller.atualizar);
r.delete('/:id', controller.deletar);

export default r;
