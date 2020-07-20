import { Request, Response } from "express";
import knex from "../database/connection";
const jwt = require("jsonwebtoken");

require("dotenv").config();
const secretKey = process.env.SECRET;

class Users_controller {
  async create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      // To do: add a bcrypt on the password

      const userResponse = await knex("users").insert({ username, password });

      return res.status(201).json({
        message: "usuario criado com sucesso",
        id: userResponse,
      });
    } catch (e) {
      res.status(500).json({
        message: "Ocorreu um erro ao criar o usuário",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const [pickedUser] = await knex("users")
        .where("username", username)
        .select();
      // Not auth
      if (!pickedUser || pickedUser.password !== password) {
        return res.status(401).json({
          message: "usuário não encontrado",
        });
      }
      //Token generation
      const token = jwt.sign({ username: pickedUser.username }, secretKey);

      //Auth
      return res.json({ token, user: pickedUser });
    } catch (e) {
      return res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  }

  async index(req: Request, res: Response) {
    try {
      return res.json(req.headers);
    } catch (e) {}
  }
}

export default Users_controller;
