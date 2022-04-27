import express from "express";
const app = express();
app.use(express.json());
app.use(express.static("src/Express/Public"));
app.get("/", (_, res): void => res.sendFile(__dirname + "/Views/index.html"));
app.listen(process.env.PORT || 3005, (): void =>
  console.log(`Server en linea en el puerto ${process.env.PORT || 3005} ✅`)
);
