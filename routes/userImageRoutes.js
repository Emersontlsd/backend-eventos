import express from 'express';
import upload from '../config/uploadConfig.js';
import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

const r = express.Router();

const uploadCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'usuarios' },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Upload inicial
r.post('/:id', upload.single('imagem'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: 'Imagem não enviada' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const result = await uploadCloudinary(req.file.buffer);

    user.avatar = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await user.save();
    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro no upload' });
  }
});

// Atualizar imagem
r.put('/:id', upload.single('imagem'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: 'Imagem não enviada' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    const result = await uploadCloudinary(req.file.buffer);

    user.avatar = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await user.save();
    res.json(user);

  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ erro: 'Erro ao remover imagem' });
  }
});

export default r;
