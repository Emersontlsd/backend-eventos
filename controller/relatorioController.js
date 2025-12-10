import Evento from '../models/Evento.js';
import Ingresso from '../models/Ingresso.js';

export default {
  async eventos(req, res) {
    try {
      const eventos = await Evento.find();
      const ingressos = await Ingresso.find();

      res.json({
        totalEventos: eventos.length,
        totalIngressos: ingressos.length,
        eventos,
      });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao gerar relatório' });
    }
  },
};
