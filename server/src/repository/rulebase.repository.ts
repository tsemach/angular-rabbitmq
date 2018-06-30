
// import {Sequelize} from 'sequelize-typescript';
// import { RuleModel } from '../../models/rule.model';
// import { MatchModel } from '../../models/match.model';
import { Rule } from '../middleware/rule';
import { RuleRepository } from './rule.repository';
import { Rulebase } from '../middleware/rulebase';

//import { f } from './find';

export class RulebaseRepository {
    private ruleRepository = new RuleRepository();

    constructor() {        
    }
    
    async load() {
        let rb: Rulebase;

        rb = await this.ruleRepository.readAll();
        console.log("RulebaseRepository:load: in then size = " + rb.rules.length);
        //console.log("RulebaseRepository:load: rb = " + JSON.stringify(rb, undefined, 2));
    
        return rb;
    }

    async save(_rulebase) {
        console.log("RulebaseRepository:save: enter to ..");        

        let rb = Rulebase.upJSON(_rulebase.data);

        let promises = [];

        rb.rules.forEach(async r => {    
            console.log("RulebaseRepository:save: r.ruleId = " + r.ruleId);
            promises.push(this.ruleRepository.upsert(r));        
        });  

        await Promise.all(promises).then(() => {
            console.log("RulebaseRepository:save: complated save all rules");
        });
        console.log("RulebaseRepository:save: edit from ... after promises");

        return rb;
    }
}


/*
const sequelize =  new Sequelize({
    database: 'rabbitmq',
    dialect: 'postgres',
    host: '172.17.0.2',
    username: 'postgres',
    password: 'postgres',
    modelPaths: [__dirname + '/models']
});

console.log(new Date());

sequelize.addModels([Rules, Matchs]);


// async function init() {
//     await sequelize.sync();
// }
//
// init();


const rulebase = Rules.build({id: 15, name: 'rule-1', source: 'work.tasks.#', filter: 1, match: 1, action: 1, createdAt: "2018-05-20T21:16:00.311Z", updatedAt: "2018-05-20T21:16:00.311Z"});
// const rulebase = Rules.build({id: 3, name: 'rule-1', source: 'work.tasks.#', filter: 1, match: 1, action: 1, createdAt: new Date(), updatedAt: new Date()});
rulebase.save().then(() => {
    console.log(Rules
        .findAll({where: {name: 'rule-1'}})
        .then((rb) => {
            return rb;
        }).then((rb) => {
            console.log("in save.then - rb = " + JSON.stringify(rb));
            rb.forEach(r => console.log(JSON.stringify(r, undefined, 2))));
        }));
});

// Rules
//     .findOne({where: {id: 2}})
//     .then(rb => {
//
//         rb.name = 'rule-1';
//         return rb.save();
//     });

console.log(Rules
    .findOne({where: {id: 9}})
    .then(rb => {
        return rb;
    }).then((r) => console.log("r = " + JSON.stringify(r))));
//
// let p = Rules
//     .findOne({include: [Matchs]})
//     .then(rb => {
//         console.log("rb = " + JSON.stringify(rb));
//         console.log("rb = " + JSON.stringify(rb) + " rm.matchs.length = " + rb.matchs);
//         //rb.Matchs.forEach(m => console.log(`MatchDefinition ${m.name}`));
//
//         return rb;
//     });

async function fff() {

    let rr = await f();

    console.log("FF rr = " + JSON.stringify(rr));
}
fff();

async function local_f() {
    return Rules
        .findOne({where: {id: 9}});
}

async function local_fff() {

    let rr = await local_f();

    console.log("local_fff rr = " + JSON.stringify(rr));
}
local_fff();






//then((r) => console.log("r = " + JSON.stringify(r))));


*/