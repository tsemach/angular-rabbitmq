import { Component, OnInit, ViewChild } from '@angular/core';
import {RulebaseComponent} from '../rulebase/rulebase.component';
import {AddRuleComponent} from '../rulebase/add-rule/add-rule.component';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit {
  name = "recorder";

  @ViewChild(RulebaseComponent) rulebase: RulebaseComponent;

  constructor() { }

  ngOnInit() {
  }

  onPublish() {
    console.log('RecorderComponent:onPublish: is called');

    this.rulebase.doPublish();
  }
}
