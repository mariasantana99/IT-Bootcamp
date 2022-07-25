const express = require("express");
const routes = express.Router();

let users = require("../usersDB");

routes.use(express.json());

// GET para verificar a lista de usuários.

routes.get("/", (req, res) => {
  res.status(200).json(users);
});

// POST para adicionar um usuário seguindo as propriedades citadas.

routes.post("/", (req, res) => {
  const content = req.body;

  users.push(content);

  res.status(200).json("Usuário inserido com sucesso!");
});

// PUT para modificar informações de um usuário.

routes.put("/:id", (req, res) => {
  const { id } = req.params;
  const content = req.body;

  if (!users.find((item) => item.id === Number(id))) {
    return res
      .status(404)
      .json({ message: "O usuário com a id desejada não existe." });
  }

  const attUsers = users.map((user) =>
    user.id === Number(id) ? content : user
  );

  users = attUsers;

  res.status(200).json({ message: "Usuário atualizado com sucesso!" });
});

// DELETE para deletar um usuário.

routes.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!users.find((item) => item.id === Number(id))) {
    return res
      .status(404)
      .json({ message: "O usuário com a id desejada não existe." });
  }

  const attUsers = users.filter((user) => user.id !== Number(id));

  users = attUsers;

  res.status(200).json({ message: "Usuário apagado com sucesso!" });
});

// Pesquise sobre o método PATCH e faça um endpoint que permita atualizar APENAS a senha do usuário.

routes.patch("/:id", (req, res) => {
  let { id } = req.params;
  let body = req.body;

  if (Object.keys(body).length !== 1 || Object.keys(body)[0] !== "password") {
    return res
      .status(400)
      .json({ message: "Insira somente a senha a ser alterada." });
  }

  if (!users.find((user) => user.id === Number(id))) {
    return res
      .status(404)
      .json({ message: "O usuário com a id desejada não existe." });
  }

  const usuario = users.find((user) => user.id === Number(id));
  usuario.password = body.password;
  res.status(200).json({ message: "Usuário atualizado com sucesso!" });
});

module.exports = routes;
