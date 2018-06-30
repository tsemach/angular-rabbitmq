import { MatchInterface } from './match.interface';

import { toJSON } from './tojason.interface';
import { toDatabase } from './todatabase.interface';
import { MatchModel } from '../../models/match.model';
import { upJSON } from './upjson.interface';

export class Match implements toJSON, toDatabase {
  private _match = new MatchInterface();
  
  constructor(_id = -1, _name = '', _ruleId = -1) {    
    this._match.id = _id;
    this._match.name = _name;
    this._match.rule = _ruleId; 
    this._match.from = {type: '', data: new Buffer('')};
    this._match.what = {operator: '', data: new Buffer('')};      
  }

  static createMatch(_model: MatchModel): Match {
    let m = new Match(_model.id, _model.name, _model.ruleId);

    m._match.from.type = _model.type;
    m._match.from.data = Match.setData(_model.type, _model.from);

    m._match.what.operator = _model.operator;
    m._match.what.data = Match.setData(_model.type, _model.what);

    return m;
  }

  static setData(type: string, buff: Buffer) {
    switch (type.toLowerCase()) {
      case 'json': return buff.toString();
      case 'text': return buff.toString();
      case 'buffer': return buff.toString();
    }
    return buff;
  }

  toJSON() {
    return this._match;
  }

  static upJSON(_match) {
    let m = new Match(_match.id, _match.name, _match.id === -1 ? _match.ruleId + 1 : _match.ruleId);

    m._match.from.type = _match.from.type;
    m._match.from.data = _match.from.data;

    m._match.what.operator = _match.what.operator;
    m._match.what.data = _match.what.data;

    return m;    
  }

  toDatabase(_args: {}) {
    let data = {      
      ruleId: _args['ruleId'],
      name: this._match.name, 
      type: this._match.from.type, 
      from: this._match.from.data, 
      what: this._match.what.data, 
      operator: this._match.from.type, 
      createdAt: Date.now(), 
      updatedAt: Date.now()  
    };

    if (this._match.id != -1) {
      data['id'] = this._match.id
    }

    return data;
  }
}