import Evento from "../models/Evento.js";
import Ingresso from "../models/Ingresso.js";

export default {
  async eventos(req, res) {
    try {
      const eventos = await Evento.find().lean();
      const now = new Date();

      const eventosData = await Promise.all(
        eventos.map(async (e) => {
          // busca ingressos do evento
          const ingressos = await Ingresso.find({ evento: e._id })
            .populate("participante", "nome email")
            .lean();

          const eventoDate = e.data ? new Date(e.data) : null;
          let status = "desconhecido";

          if (eventoDate) {
            status = eventoDate > now ? "futuro" : "passado";
          }

          return {
            ...e,
            totalIngressos: ingressos.length,
            totalParticipantes: ingressos.length,
            participantes: ingressos.map(i => i.participante),
            status,
          };
        })
      );

      res.json({
        totalEventos: eventosData.length,
        totalIngressos: eventosData.reduce((s, e) => s + e.totalIngressos, 0),
        totalParticipantes: eventosData.reduce((s, e) => s + e.totalParticipantes, 0),
        eventos: eventosData,
      });

    } catch (err) {
      console.error("Erro relatório:", err);
      res.status(500).json({ erro: "Erro ao gerar relatório" });
    }
  },
};
