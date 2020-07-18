import express from "express";
import routes from "./routes";

const app = express();

// Setup data format to be used on express
app.use(express.json());
// Use the routes file
app.use(routes);

// API port
app.listen(4004);
