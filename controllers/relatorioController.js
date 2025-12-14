// controllers/relatorioController.js
import Evento from "../models/Evento.js";
import Ingresso from "../models/Ingresso.js";
import Participante from "../models/Participante.js";

export default {
  async eventos(req, res) {
    try {
      const eventos = await Evento.find({}).lean(); // .lean() para objeto puro

      // Para cada evento, calcular quantidade de ingressos e participantes
      const eventosComTotais = await Promise.all(
        eventos.map(async (evento) => {
          // Contar ingressos e participantes vinculados a este evento
          const ingressosCount = await Ingresso.countDocuments({ evento: evento._id });
          const participantesCount = await Participante.countDocuments({ evento: evento._id });

          return {
            ...evento,
            ingressosCount,
            participantesCount,
          };
        })
      );

      // Totais gerais
      const totalEventos = eventos.length;
      const totalIngressos = eventosComTotais.reduce((acc, e) => acc + e.ingressosCount, 0);
      const totalParticipantes = eventosComTotais.reduce((acc, e) => acc + e.participantesCount, 0);

      res.json({
        totalEventos,
        totalIngressos,
        totalParticipantes,
        eventos: eventosComTotais,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao gerar relatório de eventos" });
    }
  },
};
