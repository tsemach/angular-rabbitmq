import {Component, OnInit, Input, OnChanges, ViewChild, OnDestroy} from '@angular/core';
import { SelectItem } from 'primeng/components/common/api';
import { RulebaseService } from '../services/rulebase.service';
import { Rule } from '../services/rule';
import { Match } from '../services/match';
import { Filter } from '../services/filter';
import { Source } from '../services/source';
import {AddRuleComponent} from './add-rule/add-rule.component';
import {Action} from '../services/action';
import {AddRuleService} from '../services/add-rule.service';

@Component({
  selector: 'app-rulebase',
  templateUrl: './rulebase.component.html',
  styleUrls: ['./rulebase.component.css']
})
export class RulebaseComponent implements OnInit, OnChanges, OnDestroy {
  rulebase: Rule[];
  cols: any[];
  sources: SelectItem[];
  matchs: SelectItem[];
  actions: SelectItem[];
  filters: SelectItem[];
  @Input() mode: string;
  @ViewChild(AddRuleComponent) addRuleComponent: AddRuleComponent;

  constructor(private rbService: RulebaseService, private addRuleService: AddRuleService) { }

  ngOnInit() {
      this.rbService.getRulebase(this.mode).then(rulebase => this.rulebase = rulebase);
      this.cols = [
          { field: 'name', header: 'Name' },
          { field: 'source', header: 'Source' },
          { field: 'filter', header: 'Filter' },
          { field: 'match', header: 'Match' },
          { field: 'action', header: 'Action' }
      ];
      this.sources = [];
      this.matchs = [];
      this.actions = [];
      this.filters = [];

      this.addRuleService.addNewRule.subscribe((name: string) => {
        this.onNewRule(name);
      });

      this.addRuleService.updateRule.subscribe(({name: string, rowIndex: number}) => {
        this.onNewName({name: string, rowIndex: number});
      });
  }

  ngOnChanges() {
      console.log("mode = " + this.mode);
  }

  ngOnDestroy() {
    // this.addRuleService.addNewRule.unsubscribe();
    // this.addRuleService.updateRule.unsubscribe();
  }

  onMatchChanged(match: Match) {
      console.log("RulebaseComponent:onMatchChanged: match is = " + JSON.stringify(match, undefined, 2));
      if (match.rule == -1) {
          console.error("RulebaseComponent:onMatchChanged: match.rule is -1");

          return;
      }
      console.log("RulebaseComponent:onMatchChanged: rulebase[match.rule]['match'].length = " + this.rulebase[match.rule]['match'].length);
      this.rulebase[match.rule]['match'].push(match);
      console.log("RulebaseComponent:onMatchChanged: rulebase[match.rule]['match'].length = " + this.rulebase[match.rule]['match'].length);

      let m = this.rulebase[match.rule]['match'].find(item => item.name == match.name);
      console.log("RulebaseComponent:onMatchChanged: find match = " + JSON.stringify(m, undefined, 2));
  }

  onFilterChanged(filter: Filter) {
      console.log("RulebaseComponent:onFilterChanged: filter is = " + JSON.stringify(filter, undefined, 2));
      if (filter.rule == -1) {
          console.error("RulebaseComponent:onFilterChanged: filter.rule is -1");

          return;
      }
      console.log("RulebaseComponent:onFilterChanged: rulebase[filter.rule]['filter'].length = " + this.rulebase[filter.rule]['filter'].length);
      this.rulebase[filter.rule]['filter'].push(filter);
      console.log("RulebaseComponent:onFilterChanged: rulebase[filter.rule]['filter'].length = " + this.rulebase[filter.rule]['filter'].length);
      //console.log("RulebaseComponent:onFilterChanged: rulebase = " + JSON.stringify(this.rulebase, undefined, 2));

      let f = this.rulebase[filter.rule]['filter'].find(item => item.name == filter.name);
      console.log("RulebaseComponent:onFilterChanged: find filter = " + JSON.stringify(f, undefined, 2));
  }

  onSourceChanged(source: Source) {
    console.log("RulebaseComponent:onSourceChanged: source is = " + JSON.stringify(source, undefined, 2));
    if (source.ruleId == -1) {
      console.error("RulebaseComponent:onSourceChanged: source.ruleId is -1");

      return;
    }
    console.log("RulebaseComponent:onSourceChanged: rulebase[source.ruleId]['source'].length = " + this.rulebase[source.ruleId]['source'].length);
    this.rulebase[source.ruleId]['source'].push(source);
    console.log("RulebaseComponent:onSourceChanged: rulebase[source.ruleId]['source'].length = " + this.rulebase[source.ruleId]['source'].length);
    //console.log("RulebaseComponent:onFilterChanged: rulebase = " + JSON.stringify(this.rulebase, undefined, 2));

    let f = this.rulebase[source.ruleId]['source'].find(item => item.name == source.name);
    console.log("RulebaseComponent:onSourceChanged: find source = " + JSON.stringify(f, undefined, 2));
  }

  onNameClick(rowIndex) {
    console.log("Rulebase:onNameClick: row = " + JSON.stringify(rowIndex));
    //this.addRuleComponent.onNameClick(this.rulebase[rowIndex].name, rowIndex);
    this.addRuleService.nameDialog.next({name: this.rulebase[rowIndex].name, rowIndex: rowIndex});
  }

  onNewRule(name: string) {
    console.log("Rulebase:doNewRule: is called name = " + name);
    this.rulebase.push({name: name, ruleId: this.rulebase.length+1, source: [], filter: [], match: [], action: []});
  }

  onNewName(value: {name: string, rowIndex: number}) {
    console.log("Rulebase:onNewName: name = " + value.name + ", row = " + value.rowIndex);
    this.rulebase[value.rowIndex].name = value.name;
  }

  doPublish() {
    console.log("RulebaseCompodd nent:doPublish: is called .. need to save rulebase");
    console.log("RulebaseComponent:doPublish: rulebase = " + JSON.stringify(this.rulebase, undefined, 2));
    this.rbService.putRulebase(this.mode, this.rulebase)
      .subscribe((response: Response) => {
        console.log("RulebaseComponent:doPublish: is saved on the backend, going to reloaded it");
        this.rbService.getRulebase(this.mode).then(rulebase => {
          this.rulebase = rulebase;
          console.log("RulebaseComponent:doPublish: reloaded complated!");
        });
      }
    );
  }
}
