import express from 'express';
import party from './routes/party';
import office from './routes/office';

const app = express ();
app.use(express.json());

app.use ('/api/v1/parties', party);
app.use('/api/v1/offices', office);

app.get('/', (req, res) => {
	res.send('Welcome to Politico apps');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log ( `Listen on port ${port} ...`));
export default app;
