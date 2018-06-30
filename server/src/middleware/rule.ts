import { toJSON } from './tojason.interface';
import { Source } from './source';
import { Match } from './match';
import { Filter} from './filter';
import { Action } from './action';
import { toDatabase } from './todatabase.interface';
import { RuleInterface } from './rule.interface';
import { RuleModel } from '../../models/rule.model';
import { upJSON } from './upjson.interface';

export class Rule implements toJSON, toDatabase { 
    private _rule = new RuleInterface();
    private _sources: Source[] = new Array<Source>();
    private _filters: Filter[] = new Array<Filter>();
    private _matchs: Match[] = new Array<Match>();
    private _actions: Action[] = new Array<Action>();

    constructor(_name: string = '', _ruleId = -1) {
        this._rule.name = _name;
        this._rule.ruleId = _ruleId;
        this._rule.userId = 0;    
        this._rule.groupId = 0;
        this._rule.isOn = true;
        this._rule.hit = -1;        
        
        // this.addMatch(new Match('match-01'));
        // this.addMatch(new Match('match-02'));
        // this.addFilter(new Filter('filter-01'));
        // this.addFilter(new Filter('filter-02'));
        // this.addAction(new Action('action-01'));
        // this.addSource(new Source('source-01'));
    }

    static createRule(_model: RuleModel) {
        let r = new Rule(_model.name, _model.id);    

        r._rule.userId = _model.userId;
        r._rule.groupId = _model.groupId;
        r._rule.isOn = _model.isOn;
        r._rule.hit = _model.hit;

        return r;
    }

    get name() {
        return this._rule.name;
    }

    get ruleId() {
        return this._rule.ruleId;
    }
    
    addMatch(match: Match) {
        this._matchs.push(match);
    }

    addFilter(filter: Filter) {
        this._filters.push(filter);
    }

    addAction(action: Action) {
        this._actions.push(action);
    }

    addSource(source: Source) {
        this._sources.push(source);
    }

    /**
     * @returns Array<Source>
     */
    get sources() {
        return this._sources;
    }

    get filters() {
        return this._filters;
    }

    get matchs() {
        return this._matchs;
    }

    get actions() {
        return this._actions;
    }

    set sources(sources: Array<Source>) {
        this._sources = sources;
    }

    set matchs(matchs: Array<Match>) {
        this._matchs = matchs;
    }

    set filters(filters: Array<Filter>) {
        this._filters = filters;
    }

    set actions(actions: Array<Action>) {
        this._actions = actions;
    }

    static upJSON(_rule) {
        console.log("Rule:upJSON: before _rule = " + JSON.stringify(_rule, undefined, 2));

        let rule = new Rule(_rule.name, _rule.ruleId);

        //rule.addSource(Source.upJSON(_rule.source));
        _rule.source.forEach((s) => { rule.addSource(Source.upJSON(s)); });
        _rule.match.forEach((m) => { rule.addMatch(Match.upJSON(m)); });
        _rule.filter.forEach((f) => { rule.addFilter(Filter.upJSON(f)); });
        _rule.action.forEach((a) => { rule.addAction(Action.upJSON(a)); });


        rule.filters.forEach(f => {
            console.log("Rule:upJSON: after _rule = " + JSON.stringify(f.toDatabase({}), undefined, 2));    
        });
        

        return rule;
    }

    toJSON() {
        let sources = [];
        let matchs = [];
        let filters = [];
        let actions = [];

        this._sources.forEach((s) => { sources.push(s.toJSON()); });
        this._matchs.forEach((m) => { matchs.push(m.toJSON()); });
        this._filters.forEach((f) => { filters.push(f.toJSON()); });
        this._actions.forEach((a) => { actions.push(a.toJSON()); });

        return {            
            name: this._rule.name,
            ruleId: this._rule.ruleId,
            //source: this._sources[0].toJSON(), 
            source: sources, 
            match: matchs,
            filter: filters,
            action: actions
        }
    }

    toDatabase(_args: {}) {
        return {
            id: _args['id'] ? _args['id'] : this._rule.ruleId,
            name: this._rule.name,
            userId: this._rule.userId,
            groupId: this._rule.groupId,
            isOn: this._rule.isOn,
            hit: this._rule.hit,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
    }    

    print() {
        return "I am rule - " + this._rule.name;
    }
}
// console.log(new Source().toJSON());
// console.log('Rule.toJSON = ' + JSON.stringify(new Rule().toJSON(), undefined, 2));
