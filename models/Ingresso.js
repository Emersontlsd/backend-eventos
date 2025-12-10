import mongoose from "mongoose";

const IngressoSchema = new mongoose.Schema({
  evento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evento",
    required: true
  },
  participante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participante",
    required: true
  },
  dataCompra: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["emitido", "cancelado"],
    default: "emitido"
  }
});

export default mongoose.model("Ingresso", IngressoSchema);
