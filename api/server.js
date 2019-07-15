import express from 'express';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import appRoutes from './v1/routes';
import swaggerDocument from '../docs/swagger.json';

config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', appRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));

export default app;
