import express from "express";
import routes from "./routes";
import { SECRET_KEY } from "./config";
import getToken from "./middlewares/jwt-middleware";
import jwt from "express-jwt";

const app = express();

// Setup data format to be used on express
app.use(express.json());
// Use the routes file

app.use(
  jwt({
    secret: SECRET_KEY || "portoEuru",
    algorithms: ["HS256"],
    requestProperty: "authorization",
    getToken,
  }).unless({ path: ["/login"] })
);

app.use(routes);

// API port
app.listen(4004);
