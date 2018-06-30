
import { Sequelize } from 'sequelize-typescript';
import { FilterModel } from '../../models/filter.model';
import { Filter } from '../middleware/filter';

export class FilterRepository {
    constructor() {}

    async upsert(_filter: Filter, _ruleId: number) {  
        console.log("FilterRepository:upsert: _filter = " + JSON.stringify(_filter, undefined, 2));      
        return FilterModel.upsert(_filter.toDatabase({ruleId: _ruleId})).then(() => {
            //console.log("FilterRepository: Filter saved");
        });
    }

    async readAll(_ruleId: number) {
        let filters = new Array<Filter>();

        let models = await FilterModel.findAll({
            where: {ruleId: _ruleId},
            order: [['id', 'ASC']]
        });
        models.forEach((_model) => {
            filters.push(Filter.createFilter(_model));
        });

        return filters;
    }
}

