import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  telefone: { type: String, default: null },
  foto: { type: String, default: null },
  role: { type: String, default: 'user' }, // user ou admin
  avatar: {
    url: { type: String, default: null },
    public_id: { type: String, default: null },
  },
});

export default mongoose.model('User', UserSchema);
