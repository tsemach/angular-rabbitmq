
import { Sequelize } from 'sequelize-typescript';
import { SourceModel } from '../../models/source.model';
import { Source } from '../middleware/source';
import { Rule } from '../middleware/rule';

export class SourceRepository {
    constructor() {}

    async upsert(_Source: Source, _ruleId: number) {        
        return SourceModel.upsert(_Source.toDatabase({ruleId: _ruleId})).then(() => {
            //console.log("SourceRepository: Source saved");
        });        
    }

    async read(_ruleId: number) {
        return SourceModel.findOne({
            where: {ruleId: _ruleId},
            order: [['id', 'ASC']]
        });
    }

    /**
     * @deprecated
     * @param _ruleId 
     */
    async readAllOld(_ruleId: number) {
        let sources = new Array<Source>();

        let models = await SourceModel.findAll({where: {ruleId: _ruleId}});
        models.forEach((_model) => {
            sources.push(Source.createSource(_model));
            //console.log("SourceRepository:readAll: in readAll - source = " + sources.length);
        });

        return sources;
    }

    async readAll(_ruleId: number) {
        let sources = new Array<Source>();

        let models = await SourceModel.findAll({
            where: {ruleId: _ruleId},
            order: [['id', 'ASC']]
        });
        models.forEach((_model) => {
            sources.push(Source.createSource(_model));
        });

        return sources;
    }

}
