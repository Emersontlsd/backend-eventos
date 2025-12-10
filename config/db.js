// config/db.js
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI não definido nas variáveis de ambiente');
}

/**
 * Usamos caching (globalThis) para evitar múltiplas conexões em ambientes serverless
 * (invocações quentes/frias). Isso evita erros e limites do Atlas.
 */
let cached = globalThis._mongoose;

if (!cached) {
  cached = globalThis._mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // opcional: ajustar poolSize / outras opções conforme necessidade
      // useNewUrlParser e useUnifiedTopology são padrão nas versões mais recentes
    };

    cached.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  cached.conn = await cached.promise;
  console.log('🔥 MongoDB conectado (cached)');
  return cached.conn;
}
