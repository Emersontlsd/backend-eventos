import Evento from "../models/Evento.js";
import Ingresso from "../models/Ingresso.js";
import Participante from "../models/Participante.js";

export default {
  async eventos(req, res) {
    try {
      const eventos = await Evento.find().lean();

      const now = new Date();

      const eventosData = await Promise.all(
        eventos.map(async (e) => {
          const ingressosCount = await Ingresso.countDocuments({ evento: e._id });
          const participantesCount = await Participante.countDocuments({ evento: e._id });

          // converte para Date garantindo que seja válido
          const eventoDate = e.data ? new Date(e.data) : null;
          let status = "desconhecido";
          if (eventoDate) {
            status = eventoDate > now ? "futuro" : "passado";
          }

          return {
            ...e,
            ingressosCount,
            participantesCount,
            status,
          };
        })
      );

      const totalEventos = eventosData.length;
      const totalIngressos = eventosData.reduce((sum, e) => sum + e.ingressosCount, 0);
      const totalParticipantes = eventosData.reduce((sum, e) => sum + e.participantesCount, 0);

      res.json({
        totalEventos,
        totalIngressos,
        totalParticipantes,
        eventos: eventosData,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao gerar relatório" });
    }
  },
};
