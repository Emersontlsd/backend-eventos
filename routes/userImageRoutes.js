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

r.post('/:id', upload.single('imagem'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ erro: 'Imagem não enviada' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

    // Remove foto anterior se existir
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    const result = await uploadCloudinary(req.file.buffer);
    user.avatar = {
      url: result.secure_url,
      public_id: result.public_id
    };

    await user.save();
    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar imagem' });
  }
});

export default r;
