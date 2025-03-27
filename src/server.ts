import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';


db.once('open', () => {
  console.log('Connected to database');
});

db.on('error', (err) => {
  console.log('Error connecting to database:', err);
});

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});