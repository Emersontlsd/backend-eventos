import Evento from "../models/Evento.js";
import Participante from "../models/Participante.js";

export default {
  // Listar todos os eventos com participantes e ingressos populados
  async listar(req, res) {
    try {
      const eventos = await Evento.find()
        .populate("participantes")
        .populate("ingressos");
      res.json(eventos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao listar eventos" });
    }
  },

  // Criar novo evento
  async criar(req, res) {
    try {
      const { nome, local, data } = req.body;
      if (!nome || !local || !data) return res.status(400).json({ erro: "Preencha todos os campos" });

      const evento = await Evento.create({ nome, local, data });
      res.json(evento);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao criar evento" });
    }
  },

  // Adicionar participante a um evento
  async adicionarParticipante(req, res) {
    try {
      const { idEvento, idParticipante } = req.params;

      const evento = await Evento.findById(idEvento);
      if (!evento) return res.status(404).json({ erro: "Evento não encontrado" });

      const participante = await Participante.findById(idParticipante);
      if (!participante) return res.status(404).json({ erro: "Participante não encontrado" });

      if (evento.participantes.includes(idParticipante)) {
        return res.status(400).json({ erro: "Participante já está no evento" });
      }

      evento.participantes.push(idParticipante);
      await evento.save();

      // Retorna o evento populado
      const updatedEvento = await Evento.findById(idEvento)
        .populate("participantes")
        .populate("ingressos");

      res.json(updatedEvento);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao adicionar participante" });
    }
  },

  // Deletar evento
  async deletar(req, res) {
    try {
      const { id } = req.params;
      await Evento.findByIdAndDelete(id);
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao deletar evento" });
    }
  },
};
