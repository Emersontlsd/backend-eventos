import mongoose from "mongoose";

const ParticipanteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String },
  nascimento: { type: Date },

  avatar: {
    url: { type: String, default: null },
    public_id: { type: String, default: null }
  }
});

export default mongoose.model("Participante", ParticipanteSchema);
