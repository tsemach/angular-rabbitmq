import { SourceInterface } from "./source.interface";
import { toJSON } from './tojason.interface';
import { toDatabase } from "./todatabase.interface";
import { SourceModel } from "../../models/source.model";
import { upJSON } from "./upjson.interface";

export class Source implements toJSON, toDatabase {
    private _source: SourceInterface = {id: -1, name: '', ruleId: -1};

    constructor(_id: number = -1,_name: string = '', _rule: number = -1) {
        this._source.id = _id;
        this._source.name = _name;
        this._source.ruleId = _rule;
    }

    static createSource(_from: SourceModel): Source {
        return new Source(_from.id, _from.name, _from.ruleId);
    }

    get source() {
        return this._source;
    }

    set source(s: SourceInterface) {
        this._source = s;
    }

    get name() {
        return this._source.name;
    }

    set name(_name: string) {
        this._source.name = _name;
    }

    get rule() {
        return this._source.ruleId;
    }

    set rule(_rule: number) {
        this._source.ruleId = _rule;
    }

    toJSON() {
        //return {name: this._source.name, rule: this._source.ruleId};
        return this._source;
    }

    /**
     * @description load object from json as come form GUI (angular)
     * @param _source a source part as come from angular
     */
    static upJSON(_source) {
        console.log("Source:upJSON: going to upJSON - " + JSON.stringify(_source, undefined, 2));
        return new Source(_source.id, _source.name, _source.id === -1 ?_source.ruleId + 1 : _source.ruleId);
    }

    toDatabase(_args: {}) {
        let data = {
            ruleId: _args['ruleId'],
            name: this._source.name, 
            createdAt: Date.now(), 
            updatedAt: Date.now()     
        }

        if (this._source.id != -1) {
            data['id'] = this._source.id
        }
      
        return data;
    }    

    print() {
        console.log("Source: name = " + this._source.name + ", rule = " + this._source.ruleId);
    }
}
