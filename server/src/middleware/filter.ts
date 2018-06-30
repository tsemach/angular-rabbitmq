
import { FilterInterface } from './filter.interface';
import { toJSON } from './tojason.interface';
import { toDatabase } from './todatabase.interface';
import { FilterModel } from '../../models/filter.model';

export class Filter implements toJSON, toDatabase {
  private _filter = new FilterInterface();
  
  constructor(_id = -1, _name = '', _ruleId = -1) {
    this._filter.id = _id;
    this._filter.name = _name;
    this._filter.rule = _ruleId;
    // this._filter.from = {type: '', data: new Buffer('')};
    // this._filter.what = {operator: '', data: new Buffer('')};
    this._filter.from = {type: '', data: ''};
    this._filter.what = {operator: '', data: ''};
  }

  static createFilter(_model: FilterModel): Filter {
    let f = new Filter(_model.id, _model.name, _model.ruleId);
    
    f._filter.from.type = _model.type;
    f._filter.from.data = Filter.setData(_model.type, _model.from);

    f._filter.what.operator = _model.operator;
    f._filter.what.data = Filter.setData(_model.type, _model.what);
    
    return f;
  }

  static setData(type: string, buff: Buffer) {
    switch (type.toLowerCase()) {
      case 'json': return buff.toString();
      case 'test': return buff.toString();
      case 'buffer': return buff.toString();
    }
    return buff;
  }

  toJSON() {
    return this._filter;
  }

  static upJSON(_filter) {
    let f = new Filter(_filter.id, _filter.name, _filter.id === -1 ? + _filter.ruleId + 1 : _filter.ruleId);
    
    f._filter.from.type = _filter.from.type;    
    f._filter.from.data = _filter.from.data;

    f._filter.what.operator = _filter.what.operator;
    f._filter.what.data = _filter.what.data;
    
    return f;
  }

  toDatabase(_args: {}) {
    let data = {      
      ruleId: _args['ruleId'],
      name: this._filter.name, 
      type: this._filter.from.type, 
      from: this._filter.from.data, 
      what: this._filter.what.data, 
      operator: this._filter.from.type, 
      createdAt: Date.now(), 
      updatedAt: Date.now()  
    };

    if (this._filter.id != -1) {
      data['id'] = this._filter.id
    }
    console.log("Filter:toDatabase: data - " + JSON.stringify(data, undefined, 2));
    return data;
  }
}

