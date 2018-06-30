import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
//import { WSAEDQUOT } from 'constants';
import { RulebaseRepository } from '../repository/rulebase.repository';
import { Rule } from '../middleware/rule';

export class RulebaseService {
    private rulebaseRepository = new RulebaseRepository();

    constructor() {
    }

    public add(): express.Router {
       let router = express.Router();

      // route: load -----------------------------------------------------------------------------------
      router.get('/load', async (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        let rb = await this.rulebaseRepository.load();
        res.json(rb.toJSON());
      });

      router.post('/save', async (req, res)  => {
        console.log('rulebase:save: POST got call from client post ' + req);
        console.log('rulebase:save: POST data received was: ' + JSON.stringify(req.body, undefined, 2));

        let result = await this.rulebaseRepository.save(req.body);
        // going to save req.body to database.
        // ...

        // set the appropriate HTTP header
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        let rb = await this.rulebaseRepository.load();
        res.json(rb.toJSON());
      });
      // -----------------------------------------------------------------------------------------------

      return router;
      // ------------------------------------------------------------------------------------------
    }
}

export default new RulebaseService();
