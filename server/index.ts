import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import "reflect-metadata";
import routes from "./routers/index";

const app: Express = express();
const port = process.env.PORT;

app.use(function (req, res, next) {
  var json = res.json;
  //@ts-ignore
  res.json = function (body) {
    json.call(this, {
      author: {
        name: "Bruno",
        lastname: "Viera",
      },
      ...body,
    });
  };
  next();
});

app.use("/", routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
