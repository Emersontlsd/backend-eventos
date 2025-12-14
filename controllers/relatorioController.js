import Evento from '../models/Evento.js';
import Ingresso from '../models/Ingresso.js';
import Participante from '../models/Participante.js';

export default {
  async eventos(req, res) {
    try {
      // Buscar todos os eventos
      const eventos = await Evento.find().lean(); // lean() retorna plain objects

      // Buscar ingressos de todos os eventos
      const ingressos = await Ingresso.find().populate('participante').lean();

      // Para cada evento, adicionar participantes
      const eventosComParticipantes = eventos.map(ev => {
        const ingressosDoEvento = ingressos.filter(i => i.evento.toString() === ev._id.toString());
        const participantes = ingressosDoEvento.map(i => i.participante);
        return {
          ...ev,
          participantes,
          totalIngressos: ingressosDoEvento.length,
          totalParticipantes: participantes.length
        };
      });

      res.json({
        totalEventos: eventos.length,
        totalIngressos: ingressos.length,
        eventos: eventosComParticipantes,
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao gerar relatório' });
    }
  },
};
