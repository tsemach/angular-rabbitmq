
import { Sequelize } from 'sequelize-typescript';
import { ActionModel } from '../../models/action.model';
import { Action } from '../middleware/action';

export class ActionRepository {
    constructor() {}

    async upsert(_action: Action, _ruleId: number) {        
        return ActionModel.upsert(_action.toDatabase({ruleId: _ruleId})).then(() => {
            //console.log("ActionRepository: Action saved");
        });        
    }

    async readAll(_ruleId: number) {
        let actions = new Array<Action>();

        let models = await ActionModel.findAll({
            where: {ruleId: _ruleId},
            order: [['id', 'ASC']]
        });
        models.forEach((_model) => {
            console.log("ActionRepository:readAll: _model = " + JSON.stringify(_model, undefined, 2));
            actions.push(Action.createAction(_model));
        });

        return actions;
    }    
}

