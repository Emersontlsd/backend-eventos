# Plataforma de Eventos - Back-end

Este é o **back-end** da plataforma de eventos, desenvolvido em **Node.js** com **Express**, utilizando **MongoDB** como banco de dados e **JWT** para autenticação. Suporta upload de imagens de participantes e usuários via **Cloudinary**.

---

## 💻 Tecnologias

- Node.js 20+
- Express
- MongoDB + Mongoose
- JWT (JSON Web Token)
- Cloudinary (upload de imagens)
- CORS configurado para múltiplos front-ends
- Dotenv (variáveis de ambiente)
- bcryptjs (hash de senhas)

---

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_BACKEND>
cd backend
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
```

3. Configure variáveis de ambiente:

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```env
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/nomeDB
JWT_SECRET=uma_chave_secreta
CLOUDINARY_CLOUD_NAME=nome_da_cloud
CLOUDINARY_API_KEY=chave_api
CLOUDINARY_API_SECRET=segredo_api
PORT=3333
```

---

## 🏃‍♂️ Executando o projeto

```bash
npm run dev
# ou
yarn dev
```

O servidor estará disponível em: `http://localhost:3333`

---

## 📂 Estrutura de Pastas

```
src/
 ├─ config/        # Configuração do MongoDB e Cloudinary
 ├─ controllers/   # Lógica das rotas
 ├─ middlewares/   # Autenticação, roles, CORS
 ├─ models/        # Schemas do MongoDB
 ├─ routes/        # Rotas da API
 ├─ index.js       # Inicialização do servidor
```

---

## 🔗 Rotas principais

### Autenticação

| Método | Rota           | Descrição                  |
|--------|----------------|----------------------------|
| POST   | /auth/login    | Login de usuário/admin     |
| POST   | /auth/register | Cadastro de usuário        |

### Administradores

| Método | Rota          | Descrição                          | Permissão         |
|--------|---------------|-----------------------------------|-----------------|
| GET    | /admins       | Listar administradores            | Somente admin    |
| POST   | /admins       | Criar administrador               | Somente admin    |
| DELETE | /admins/:id   | Deletar administrador             | Somente admin    |

### Eventos, Participantes e Ingressos

| Método | Rota               | Descrição                     |
|--------|------------------|--------------------------------|
| GET    | /eventos          | Listar eventos                |
| POST   | /eventos          | Criar evento                  |
| GET    | /participantes    | Listar participantes          |
| POST   | /participantes    | Criar participante            |
| GET    | /ingressos        | Listar ingressos              |
| POST   | /ingressos        | Criar ingresso                |

### Relatórios

| Método | Rota                        | Descrição                                   |
|--------|----------------------------|--------------------------------------------|
| GET    | /relatorios/eventos         | Retorna total de ingressos, participantes e status dos eventos |

### Upload de imagens

| Método | Rota                    | Descrição                     |
|--------|------------------------|--------------------------------|
| POST   | /participantes/imagem  | Upload de imagem de participante |
| POST   | /usuarios/imagem       | Upload de imagem de usuário     |

---

## ⚙️ CORS

O back-end está configurado para aceitar requisições apenas de:

- `http://localhost:5173`
- `https://plataforma-eventos-bay.vercel.app`

---

## 🔒 Autenticação

O back-end usa **JWT**.  
Tokens devem ser enviados no header:

```
Authorization: Bearer <TOKEN>
```

---

## 🛠️ Dependências principais

- express
- mongoose
- cors
- dotenv
- bcryptjs
- jsonwebtoken
- cloudinary
