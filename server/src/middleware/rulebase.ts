import { Rule } from './rule';
import { toJSON } from './tojason.interface';

export class Rulebase implements toJSON {
    //private _rules: Rule[] = new Array<Rule>();
    private _rules: Rule[] = new Array<Rule>();

    constructor() {
        // this.addRule(new Rule("from-rulebase-1"));
        // this.addRule(new Rule("from-rulebase-2"));
    }

    addRule(rule: Rule) {
        console.log("Rulebase:addRule: rule.name = " + rule.name + ", rule.ruleId = " + rule.ruleId);
        this._rules.push(rule);        
    }

    getRule(index: number) {
        return this._rules[index];
    }

    set rules(rules: Rule[]) {
        this._rules = rules;
    }

    get rules() {
        return this._rules;
    }

    toJSON() {
        let rules = [];

        this._rules.forEach((r) => {
            rules.push(r.toJSON());
        });

        return {data: rules};
    }

    static upJSON(_rulebase) {
        let rb = new Rulebase();

        _rulebase.forEach(_rule => {            
            rb.addRule(Rule.upJSON(_rule));
        });
        
        return rb;
    }    
}

// let rb = new Rulebase();

// console.log('rb.toJSON = ' + JSON.stringify(rb.toJSON(), undefined, 2));


