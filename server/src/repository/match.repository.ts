
import { Sequelize } from 'sequelize-typescript';
//import { RuleModel } from '../../models/rule.model';
import { MatchModel } from '../../models/match.model';
import { Match } from '../middleware/match';

export class MatchRepository {
    constructor() {}

    async upsert(_match: Match, _ruleId: number) {        
        return MatchModel.upsert(_match.toDatabase({ruleId: _ruleId})).then(() => {
            // console.log("MatchRepository: Match saved");
        });        
    }

    async readAll(_ruleId: number) {
        let matchs = new Array<Match>();

        let models = await MatchModel.findAll({
            where: {ruleId: _ruleId},
            order: [['id', 'ASC']]
        });
        models.forEach((_model) => {
            matchs.push(Match.createMatch(_model));
        });

        return matchs;
    }
}