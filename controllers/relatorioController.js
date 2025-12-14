import Evento from "../models/Evento.js";

export default {
  async eventos(req, res) {
    try {
      const eventos = await Evento.find({})
        .populate("participantes") // garante que participantes estejam carregados
        .populate("ingressos");    // garante que ingressos estejam carregados

      const totalEventos = eventos.length;
      const totalIngressos = eventos.reduce((acc, e) => acc + (e.ingressos?.length ?? 0), 0);
      const totalParticipantes = eventos.reduce((acc, e) => acc + (e.participantes?.length ?? 0), 0);

      res.json({
        totalEventos,
        totalIngressos,
        totalParticipantes,
        eventos,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao gerar relatório de eventos" });
    }
  },
};
