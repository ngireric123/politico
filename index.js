import express from 'express';
import party from './routes/party';
import office from './routes/office';
import user from './routes/user';
import pool from './models/db';

const app = express();
app.use(express.json());

app.use('/api/v1/parties', party);
app.use('/api/v1/offices', office);
app.use('/api/v1/auth', user);
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Politico apps!',
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Politico is running on port ${port} ...`));
export default app;
