import Evento from '../models/Evento.js';

export default {
  async listar(req, res) {
    const eventos = await Evento.find().populate('participantes');
    res.json(eventos);
  },

  async buscarPorId(req, res) {
    const evento = await Evento.findById(req.params.id).populate(
      'participantes'
    );
    if (!evento)
      return res.status(404).json({ error: 'Evento não encontrado' });
    res.json(evento);
  },

  async criar(req, res) {
    const novo = await Evento.create(req.body);
    res.json(novo);
  },

  async atualizar(req, res) {
    const atualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('participantes');

    res.json(atualizado);
  },

  async deletar(req, res) {
    await Evento.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  },
};
