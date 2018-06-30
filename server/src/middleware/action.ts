import { ActionInterface, ActionInterfaceDefault } from './action.interface';
import { toJSON } from './tojason.interface';
import { toDatabase } from './todatabase.interface';
import { ActionModel } from '../../models/action.model'
import { upJSON } from './upjson.interface';

export class Action implements toJSON, toDatabase {
  private _action = new ActionInterface();
  
  constructor(_id = -1,_action = '', _ruleId = -1) {
    this._action.id = _id;
    this._action.action = _action;
    this._action.ruleId = _ruleId;
  }

  static createAction(_from: ActionModel): Action {
    return new Action(_from.id, _from.action, _from.ruleId);
  }

  toJSON() {
    return this._action;
  }

  static upJSON(_action) {
    return new Action(_action.id, _action.action, _action.id === -1 ? _action.ruleId + 1 : _action.ruleId);
  }

  toDatabase(_args: {}) {
    let data = {      
      action: this._action.action,
      ruleId: _args['ruleId'],
    }

    if (this._action.id != -1) {
      data['id'] = this._action.id
    }

    return data;
  }
}
