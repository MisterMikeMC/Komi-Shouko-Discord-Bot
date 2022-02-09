console.clear();
import express from 'express';
import body from 'body-parser'
require('dotenv').config()
const app = express()
app.use(body.json());
app.use(body.urlencoded({ extended: true }));
app.use(express.static('src/Public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/Views/Home.html'));
app.use("/commands", (req, res) => res.sendFile(__dirname + "/Views/Commands.html"));
app.use("/support", (req, res) => res.sendFile(__dirname + "/Views/Support.html"));
app.use("/invite", (req, res) => res.sendFile(__dirname + "/Views/Invite.html"));
app.use("/developers", (req, res) => res.sendFile(__dirname + "/Views/Developer.html"));
app.listen(process.env.PORT, () => console.log(`Server en linea en el puerto ${process.env.PORT} ✅`));