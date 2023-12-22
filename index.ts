import express from 'express';
import cors from 'cors';

const app = express();

//config json response

app.use(express.json());

//solve cors
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:4200',
  })
);

//public

app.use(express.static('public'));

//Routes

const UserRoutes = require('./routes/UserRoutes');

app.use('/users', UserRoutes);

app.listen(5000);
