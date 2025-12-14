import express from "express";
import upload from "../config/uploadConfig.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import auth from "../middlewares/authMiddleware.js";

const r = express.Router();

const uploadCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "usuarios" },
      (err, result) => (err ? reject(err) : resolve(result))
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });

r.post("/:id", auth, upload.single("imagem"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ erro: "Imagem não enviada" });

    if (req.userId !== req.params.id && req.userRole !== "admin") {
      return res.status(403).json({ erro: "Acesso negado" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });

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
    res.status(500).json({ erro: "Erro no upload" });
  }
});

export default r;
