import Participante from '../models/Participante.js';

export default {
  async listar(req, res) {
    const lista = await Participante.find();
    res.json(lista);
  },

  async criar(req, res) {
    try {
      const novo = await Participante.create(req.body);
      res.json(novo);
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao criar participante' });
    }
  },

  async atualizar(req, res) {
    try {
      const atualizado = await Participante.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(atualizado);
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao atualizar participante' });
    }
  },

  async deletar(req, res) {
    try {
      await Participante.findByIdAndDelete(req.params.id);
      res.json({ mensagem: 'Participante removido' });
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao deletar participante' });
    }
  },
};
