import dotenv from 'dotenv';
dotenv.config();

import { isCelebrateError } from 'celebrate';
import express, { Errback, NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocs from './config/swagger.json';
import routes from './routes';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

app.use((req, res, next) => {
  res.status(404).send('Content not found');
});

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  if (isCelebrateError(err)) {
    let message = err.message;
    if (Object.fromEntries(err.details).body) {
      message += ': ' + Object.fromEntries(err.details).body.details[0].message;
    }
    return res.status(400).json({ error: message });
  } else {
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running in the port ${port}`);
});
