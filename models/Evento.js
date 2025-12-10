import mongoose from "mongoose";

const EventoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  local: { type: String, required: true },
  capacidade: { type: Number, required: true },
  data: { type: String, required: true },

  participantes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Participante" }
  ],
});

export default mongoose.model("Evento", EventoSchema);
