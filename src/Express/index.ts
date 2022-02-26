import express from 'express';
import body from 'body-parser'
const app = express()
app.use(body.json());
app.use(body.urlencoded({ extended: true }));
app.use(express.static('src/Public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/Views/index.html'));
app.listen(process.env.PORT, () => console.log(`Server en linea en el puerto ${process.env.PORT} ✅`));