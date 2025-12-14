// controllers/relatorioController.js
import Evento from "../models/Evento.js";

export default {
  async eventos(req, res) {
    try {
      // Busca eventos e popula ingressos e participantes
      const eventos = await Evento.find({})
        .populate("participantes")  // garante que cada evento tenha lista de participantes
        .populate("ingressos");     // garante que cada evento tenha lista de ingressos

      // Calcula totais
      const totalEventos = eventos.length;
      const totalIngressos = eventos.reduce((acc, e) => acc + (e.ingressos?.length || 0), 0);
      const totalParticipantes = eventos.reduce((acc, e) => acc + (e.participantes?.length || 0), 0);

      res.json({
        totalEventos,
        totalIngressos,
        totalParticipantes,
        eventos, // cada evento terá .participantes e .ingressos
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao gerar relatório de eventos" });
    }
  },
};
