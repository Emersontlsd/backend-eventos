import express from "express";
import upload from "../config/uploadConfig.js";
import Participante from "../models/Participante.js";
import cloudinary from "../config/cloudinary.js";

const r = express.Router();

// upload inicial
r.post("/:id", upload.single("imagem"), async (req, res) => {
  try {
    const participante = await Participante.findById(req.params.id);
    if (!participante)
      return res.status(404).json({ erro: "Participante não encontrado" });

    participante.avatar = {
      url: req.file.path,
      public_id: req.file.filename
    };

    await participante.save();
    res.json(participante);

  } catch (err) {
    res.status(500).json({ erro: "Erro ao fazer upload" });
  }
});

// atualizar imagem
r.put("/:id", upload.single("imagem"), async (req, res) => {
  try {
    const participante = await Participante.findById(req.params.id);
    if (!participante)
      return res.status(404).json({ erro: "Participante não encontrado" });

    // Deletar imagem antiga se existir
    if (participante.avatar?.public_id) {
      await cloudinary.uploader.destroy(participante.avatar.public_id);
    }

    participante.avatar = {
      url: req.file.path,
      public_id: req.file.filename
    };

    await participante.save();
    res.json(participante);

  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar imagem" });
  }
});

// deletar imagem
r.delete("/:id", async (req, res) => {
  try {
    const participante = await Participante.findById(req.params.id);
    if (!participante)
      return res.status(404).json({ erro: "Participante não encontrado" });

    if (participante.avatar?.public_id) {
      await cloudinary.uploader.destroy(participante.avatar.public_id);
    }

    participante.avatar = null;
    await participante.save();

    res.json({ mensagem: "Imagem removida" });

  } catch (err) {
    res.status(500).json({ erro: "Erro ao remover imagem" });
  }
});

export default r;
