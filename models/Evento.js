import mongoose from "mongoose";

const EventoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  local: { type: String, required: true },
  data: { type: Date, required: true },
  participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Participante" }],
  ingressos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingresso" }],
});

export default mongoose.model("Evento", EventoSchema);
