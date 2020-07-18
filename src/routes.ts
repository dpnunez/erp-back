import express from "express";

import { Users_controller } from "./controllers";

// setup a "routes listner"
const routes = express.Router();
const userController = new Users_controller();

routes.post("/users", userController.create);
routes.post("/login", userController.login);

export default routes;
