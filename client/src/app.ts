// requirements
import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes';

// express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/api', productRoutes);

// run server
app.listen(4000, () => {
  console.log('Server listing on port 4000');
});
