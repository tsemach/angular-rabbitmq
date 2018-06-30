import {Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy} from '@angular/core';
import {RulebaseComponent} from '../rulebase.component';
import {AddRuleService} from '../../services/add-rule.service';

@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.css']
})
export class AddRuleComponent implements OnInit, OnDestroy {
  // @Deprecated
  @Output() newRule = new EventEmitter<string>();
  // @Deprecated
  @Output() newName = new EventEmitter<{name: string, rowIndex: number}>();

  name = '';
  displayNewRuleEditorDialog = false;
  isNew = false;
  rowIndex = -1;

  constructor(private addRuleService: AddRuleService) { }

  ngOnInit() {
    this.addRuleService.ruleDialog.subscribe(() => {
      this.onNewRule();
    });
    this.addRuleService.nameDialog.subscribe((data: {name: string, rowIndex: number}) => {
      console.log(`AddRuleComponent:ngOnInit: name = ${data.name}, rowIndex = ${data.rowIndex}`);
      this.onNameClick(data.name, data.rowIndex);
    });
  }

  ngOnDestroy() {
    //this.addRuleService.ruleDialog.unsubscribe();
    //this.addRuleService.nameDialog.unsubscribe();
  }

  onNewRule() {
    this.name = '';
    this.rowIndex = -1;
    this.isNew = true;
    this.displayNewRuleEditorDialog = true;
  }

  onNameClick(name: string, rowIndex: number) {
    this.name = name;
    this.rowIndex = rowIndex;
    console.log(`AddRuleComponent:onNameClick: name = ${this.name}, rowIndex = ${this.rowIndex}`);

    this.isNew = false;
    this.displayNewRuleEditorDialog = true;
  }

  onSave() {
    console.log("AddRuleComponent:onSave: is called - value = " + this.name + " rowIndex = " + this.rowIndex);
    this.displayNewRuleEditorDialog = false;
    if (this.isNew) {
      //this.newRule.emit(this.name);
      this.addRuleService.addNewRule.next(this.name);
    }
    else {
      console.log(`AddRuleComponent:onSave: ${this.name} ${this.rowIndex}`);
      //this.newName.emit({name: this.name, rowIndex: this.rowIndex});
      this.addRuleService.updateRule.next({name: this.name, rowIndex: this.rowIndex});
    }
  }

  onCancel(event) {
    this.displayNewRuleEditorDialog = false;
  }
}
