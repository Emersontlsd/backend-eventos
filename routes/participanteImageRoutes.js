import express from "express";
import upload from "../config/uploadConfig.js";
import Participante from "../models/Participante.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const r = express.Router();

const uploadCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "participantes" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

r.post("/:id", upload.single("imagem"), async (req, res) => {
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
      public_id: result.public_id
    };

    await participante.save();
    res.json(participante);

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao fazer upload" });
  }
});

export default r;
