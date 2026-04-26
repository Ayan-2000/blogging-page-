import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import createRouter from './routes/create.router.js';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(createRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;