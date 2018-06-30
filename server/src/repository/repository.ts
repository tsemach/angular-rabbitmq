
import {Sequelize} from 'sequelize-typescript';
import { RuleModel } from '../../models/rule.model';
import { SourceModel } from '../../models/source.model';
import { MatchModel } from '../../models/match.model';
import { FilterModel } from '../../models/filter.model';
import { ActionModel } from '../../models/action.model';

export class Repository {
    private sequelize: any;

    constructor() {
        this.sequelize =  new Sequelize({
            dialect: 'postgres',
            database: 'rabbitmq',
            host: '172.17.0.2',
            username: 'postgres',
            password: 'postgres',
            modelPaths: [__dirname + '/models']
        });

        this.sequelize.addModels([RuleModel, SourceModel, MatchModel, FilterModel, ActionModel]);
    }
}


// const rulebase = Rules.build({id: 17, name: 'rule-1', source: 'work.tasks.#', filter: 1, match: 1, action: 1, createdAt: "2018-05-20T21:16:00.311Z", updatedAt: "2018-05-20T21:16:00.311Z"});
// // const rulebase = Rules.build({id: 3, name: 'rule-1', source: 'work.tasks.#', filter: 1, match: 1, action: 1, createdAt: new Date(), updatedAt: new Date()});
// rulebase.save();const matchs = MatchModel.build({
    //     id: 21, 
    //     ruleId: 1, 
    //     name: 'match-1', 
    //     input: 'work.tasks.#', 
    //     operator: 'json', 
    //     output: 'buff', 
    //     createdAt: Date.now(), 
    //     updatedAt: Date.now()
    // });
    // console.log(Date.now());
    // // const rulebase = Rules.build({id: 3, name: 'rule-1', source: 'work.tasks.#', filter: 1, match: 1, action: 1, createdAt: new Date(), updatedAt: new Date()});
    
    // .then(
    // () => {
    //     console.log(
    //         Rules
    //             .findAll({where: {name: 'rule-1'}})
    //             .then((rb) => {
    //                 return rb;
    //             })
    //             .then((rb) => {
    //                 console.log("in save.then - rb = " + JSON.stringify(rb));
    //                 rb.forEach(r => console.log(JSON.stringify(r, undefined, 2))));
    //             }));
    // });
    //

/*
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