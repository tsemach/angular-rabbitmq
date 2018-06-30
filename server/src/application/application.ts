require ('dotenv').config();
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Repository } from '../repository/repository';

import rulebase from './rulebase.service';

class Application {

  public express: express.Application;

  // run configuration methods on the express instance.
  constructor() { 
    this.express = express();
    this.express.use(cors())
    this.middleware();
    this.routes();
    new Repository();
  }

  // configure express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  private routes(): void {
    this.express.use('/recorder/rulebase', rulebase.add());
  }
}

let application = new Application();

const port: number = +process.env.PORT;

application.express.listen(port, () => {
    // success callback
    console.log(`Listening at http://localhost:${port}/`);
});
