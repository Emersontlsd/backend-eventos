import express from "express";
import upload from "../config/uploadConfig.js";
import Participante from "../models/Participante.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import auth, { onlyAdmin } from "../middlewares/authMiddleware.js";

const r = express.Router();

const uploadCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "participantes" },
      (err, result) => (err ? reject(err) : resolve(result))
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });

r.post("/:id", auth, onlyAdmin, upload.single("imagem"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: "Imagem não enviada" });
    }

    const participante = await Participante.findById(req.params.id);
    if (!participante) {
      return res.status(404).json({ erro: "Participante não encontrado" });
    }

    const result = await uploadCloudinary(req.file.buffer);

    participante.avatar = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await participante.save();
    res.json(participante);

  } catch (err) {
    res.status(500).json({ erro: "Erro ao fazer upload" });
  }
});

export default r;
