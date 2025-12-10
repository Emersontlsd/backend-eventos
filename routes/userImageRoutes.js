import express from 'express';
import upload from '../config/uploadConfig.js';
import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

const r = express.Router();

// Upload inicial
r.post('/:id', upload.single('imagem'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

    user.avatar = {
      url: req.file.path,
      public_id: req.file.filename,
    };

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ erro: 'Erro no upload' });
  }
});

// Atualizar imagem
r.put('/:id', upload.single('imagem'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    user.avatar = {
      url: req.file.path,
      public_id: req.file.filename,
    };

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar imagem' });
  }
});

// Deletar imagem
r.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    user.avatar = null;
    await user.save();

    res.json({ mensagem: 'Imagem removida' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover imagem' });
  }
});

export default r;
