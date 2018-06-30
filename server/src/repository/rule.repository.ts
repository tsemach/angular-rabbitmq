
import { Sequelize } from 'sequelize-typescript';
import { RuleModel } from '../../models/rule.model';
import { MatchModel } from '../../models/match.model';
import { Match } from '../middleware/match';
import { Rule } from '../middleware/rule';
//import { Repository } from './repository';
import { MatchRepository } from './match.repository';
import { FilterRepository } from './filter.repository';
import { ActionRepository } from './action.repository';
import { SourceRepository } from './source.repository';
import { domainToASCII } from 'url';
import { Rulebase } from '../middleware/rulebase';
import { resolve } from 'bluebird';

export class RuleRepository {
    private sourceRepository = new SourceRepository();
    private matchRepository = new MatchRepository();
    private filterRepository = new FilterRepository();
    private actionRepository = new ActionRepository();

    constructor() {
    }

    async upsert(_rule: Rule) {
        return RuleModel.upsert(_rule.toDatabase({id: _rule.ruleId})).then( async () => {            
            console.log("RuleRepository: rule is saving ..");

            let promises = [];

            // upsert all sources
            _rule.sources.forEach(async source => {
                promises.push(this.sourceRepository.upsert(source, _rule.ruleId));
            });            

            // upsert all filters
            _rule.filters.forEach(async filter => {
                promises.push(this.filterRepository.upsert(filter, _rule.ruleId));
            });

            // upsert all matchs 
            _rule.matchs.forEach(async match => {
                promises.push(this.matchRepository.upsert(match, _rule.ruleId));
            });

            // upsert all filters
            _rule.actions.forEach(async action => {
                promises.push(this.actionRepository.upsert(action, _rule.ruleId));
            });

            await Promise.all(promises).then(() => {
                console.log("RuleRepository: complete saving rule - " + _rule.name); 
            });
        });        
    }

    // async upsertOld(_rule: Rule) {
    //     return RuleModel.upsert(_rule.toDatabase({id: _rule.ruleId})).then(() => {
    //         console.log("RuleRepository: rule is save");

    //         // upsert all sources
    //         _rule.sources.forEach(async source => {
    //             await this.sourceRepository.upsert(source, _rule.ruleId);
    //         });            

    //         // upsert all filters
    //         _rule.filters.forEach(async filter => {
    //             await this.filterRepository.upsert(filter, _rule.ruleId);
    //         });

    //         // upsert all matchs 
    //         _rule.matchs.forEach(async match => {
    //             await this.matchRepository.upsert(match, _rule.ruleId);
    //         });

    //         // upsert all filters
    //         _rule.actions.forEach(async action => {
    //             await this.actionRepository.upsert(action, _rule.ruleId);
    //         });
    //     });        
    // }

    /**
     * @description read rule from database where _args is the condition of finding the rule
     * @param _args is where value of fineOne, like findOne({where: {id: 9}}) => then _args is {id: 9}
     */
    async readAll(_args: {} = null) {
        _args = _args === null ? {} : _args;
        console.log("RuleRepository:read: enter to .. _args = " + JSON.stringify(_args));

        let rb = new Rulebase();                

        let models = await RuleModel.findAll({
            where: _args, 
            order: [['id', 'ASC']]
        });
        for (let m in models) {
            console.log("RuleRepository:read: m = " + m + ", models[m] = " + JSON.stringify(models[+m]));
            
            let rule = Rule.createRule(models[+m]);                
            
            let p1 = this.sourceRepository.readAll(rule.ruleId);                
            let p2 = this.filterRepository.readAll(rule.ruleId);
            let p3 = this.matchRepository.readAll(rule.ruleId);
            let p4 = this.actionRepository.readAll(rule.ruleId);
            
            await Promise.all([p1, p2, p3, p4]).then(values => {
                rule.sources = values[0];
                rule.filters = values[1];
                rule.matchs = values[2];
                rule.actions = values[3];
    
                rb.addRule(rule);
            });
        }    
        console.log("RuleRepository:read: exit from .. rules.length = " + rb.rules.length);

        return rb;
    }

    async readAllOld() {
        console.log("RuleRepository:readAll: enter to ..");

        let models = await RuleModel.findAll();
        
        console.log("RuleRepository:readAll: size of models is " + JSON.stringify(models[0]));
        console.log("RuleRepository:readAll: size of models is " + JSON.stringify(models[1]));
        let rules = new Array<Rule>();

        console.log("RuleRepository:readAll: before forEach " + models.length);

        for (let m in models) {
            console.log("");
            console.log("RuleRepository:readAll: m = " + m + ", rule model = " + JSON.stringify(models[m].name, undefined, 2));

                let rule = Rule.createRule(models[m]);
            console.log("RuleRepository:readAll: rule = " + JSON.stringify(rule.name, undefined, 2) + ", m = " + m);
            
            rule.sources = await this.sourceRepository.readAll(rule.ruleId);                
            // console.log("RuleRepository:readAll: rule.sources = " + JSON.stringify(rule.sources, undefined, 2));
            // console.log("RuleRepository:readAll: in forEach, after sources " + models.length);

            rule.filters = await this.filterRepository.readAll(rule.ruleId);                
            // console.log("RuleRepository:readAll: rule.filters = " + JSON.stringify(rule.filters, undefined, 2));
            // console.log("RuleRepository:readAll: in forEach, after filters " + models.length);

            rule.matchs = await this.matchRepository.readAll(rule.ruleId);                
            // console.log("RuleRepository:readAll: rule.matchs = " + JSON.stringify(rule.matchs, undefined, 2));
            // console.log("RuleRepository:readAll: in forEach, after matchs " + models.length);

            rule.actions = await this.actionRepository.readAll(rule.ruleId);                
            // console.log("RuleRepository:readAll: rule.actions = " + JSON.stringify(rule.actions, undefined, 2));            

            rules.push(rule);

            console.log("RuleRepository:readAll: in forEach -  " + models.length);
            console.log("RuleRepository:readAll: in forEach rule = " + JSON.stringify(rule.name, undefined, 2) + ", m = " + m);
            console.log("RuleRepository:readAll: in forEach - rules.lenngth  " + rules.length);
            if (m == '0') {
                console.log("RuleRepository:readAll: in forEach, rule[0] = " + rules[0].name);
            }
            if (m == '1') {
                console.log("RuleRepository:readAll: in forEach, rule[0] = " + rules[0].name);
                console.log("RuleRepository:readAll: in forEach, rule[1] = " + rules[1].name);
            }
    
            console.log("");            
        }      
        console.log("RuleRepository:readAll: after forEach, after actions " + models.length);
        console.log("RuleRepository:readAll: after forEach, rule[0] = " + rules[0].name);
        console.log("RuleRepository:readAll: after forEach, rule[1] = " + rules[1].name);
        console.log("RuleRepository:readAll: exit from .. " + models.length);

        return rules;
    }

    async deleteAll() {
        const rulebase = await RuleModel.findAll();        
        console.log("RuleRepository:deleteAll: rulebase is = " + JSON.stringify(rulebase, undefined, 2));     
    }
}

// async function doit() {
//     new Repository();
//     let rb = new RuleRepository()
//     await rb.upsert(new Rule('Rule-1', 1));
//     await rb.upsert(new Rule('Rule-2', 2));
//     await rb.deleteAll();
    
//     let rules = await rb.readAll();
//     console.log("DOIT: in then size = " + rules.length);

//     for (let r in rules) {        
//         console.log("DOIT: + r = " + r + ", " + JSON.stringify(rules[r].name, undefined, 2));
//     }
//     for (let r in rules) {                
//         console.log("DOIT: toJSON = " + JSON.stringify(rules[0].toJSON()));
//     }
//     // rb.readAll().then((rules) => {
//     //     console.log("DOIT: in then size = " + rules.length);
//     //     console.log("DOIT: + " + JSON.stringify(rules, undefined, 2));
//     //     // rules.forEach(_rule => {
//     //     //     console.log("doit: rule = " + JSON.stringify(_rule, undefined, 2));
//     //     // });
//     // });
    
//     //console.log("DOIT: size of rules is = " + rules.length);    
//     //console.log("DOIT: rules is = " + JSON.stringify(rules, undefined, 2));
//     // rules.forEach(_rule => {
//     //     console.log("doit: rule = " + JSON.stringify(_rule, undefined, 2));
//     // });
// }

// doit();



// let r = new MatchRepository();
// r.upsert(new Match());

//process.exit();

// async function init() {
//     await sequelize.sync();
// }
//
// init();

//const rule = RuleModel.upsert({id: 115, name: 'rule-1', source: 'work.tasks.#', filter: 1, match: 1, action: 1, createdAt: "2018-05-20T21:16:00.311Z", updatedAt: "2018-05-20T21:16:00.311Z"});
// const rule = RuleModel.build({id: 198, name: 'rule-1', source: 'work.tasks.#', filter: 1, match: 1, action: 1, createdAt: "2018-05-20T21:16:00.311Z", updatedAt: "2018-05-20T21:16:00.311Z"});
// rule.save().then(() => {
//     console.log("rule saved");
//     const matchs = MatchModel.build({
//         id: 223, 
//         ruleId: 198, 
//         name: 'match-1', 
//         input: 'work.tasks.#', 
//         operator: 'json', 
//         output: 'buff', 
//         createdAt: Date.now(), 
//         updatedAt: Date.now()
//     });
//     console.log(Date.now());
//     // const rulebase = Rules.build({id: 3, name: 'rule-1', source: 'work.tasks.#', filter: 1, match: 1, action: 1, createdAt: new Date(), updatedAt: new Date()});
//     matchs.save().then(() => { console.log("Matcs saved"); });
//     });

// const rulebase = Rules.build({id: 15, name: 'rule-1', source: 'work.tasks.#', filter: 1, match: 1, action: 1, createdAt: "2018-05-20T21:16:00.311Z", updatedAt: "2018-05-20T21:16:00.311Z"});
// // const rulebase = Rules.build({id: 3, name: 'rule-1', source: 'work.tasks.#', filter: 1, match: 1, action: 1, createdAt: new Date(), updatedAt: new Date()});
// rulebase.save().then(() => {
//     console.log(Rules
//         .findAll({where: {name: 'rule-1'}})
//         .then((rb) => {
//             return rb;
//         }).then((rb) => {
//             console.log("in save.then - rb = " + JSON.stringify(rb));
//             rb.forEach(r => console.log(JSON.stringify(r, undefined, 2))));
//         }));
// });

