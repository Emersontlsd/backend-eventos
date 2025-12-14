import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, default: "admin" },
});

// antes de salvar, hash da senha
AdminSchema.pre("save", function(next) {
  if (!this.isModified("senha")) return next();
  const salt = bcrypt.genSaltSync(10);
  this.senha = bcrypt.hashSync(this.senha, salt);
  next();
});

export default mongoose.model("Admin", AdminSchema);
