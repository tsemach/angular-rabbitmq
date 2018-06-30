import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Action } from '../services/action';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-cell-action',
  templateUrl: './cell-action.component.html',
  styleUrls: ['./cell-action.component.css']
})
export class CellActionComponent implements OnInit {
  @Input() action: Action[];
  @Input() index: number = -1;
  @Output() actionChanged = new EventEmitter<Action>();

  actions: SelectItem[];
  fields: SelectItem[];
  selectedFieldAction: string[];
  selectedFieldField: string[];

  selectedAction: Action;
  actionToEdit: Action = undefined;

  newAction: boolean;
  actionIndex: number;
  isReadonly: boolean;

  displayActionEditorDialog: boolean = false;

  constructor() { }

  ngOnInit() {
    this.actions = [
      {label: 'Record', value: 'Record'},
      {label: 'Response', value: 'Response'}
    ];

    this.fields = [
      {label: 'Id', value: 'id'},
      {label: 'Rule', value: 'Value'}];
  }

  /**
   * Action:
   *  id: number;
   *  action: string;
   *  ruleID: number;
   *
   * @returns {{id: number; name: string; ruleId: number; from: {type: string; data: string}; what: {operator: string; data: string}; action: (any) => any}}
   */
  createNewAction() {
    console.log("CellActionComponent:createNewAction: index = " + this.index);
    return {
      id: -1,
      action: '',
      ruleId: this.index,
    };
  }

  showDialogToAdd() {
    this.newAction = true;
    this.actionToEdit = this.createNewAction();
    this.displayActionEditorDialog = true;
    this.isReadonly = true;
  }

  cloneAction(m: Action): Action {
    let cloned = Object.assign({}, m);
    console.log("cloneAction: cloned = " + JSON.stringify(cloned));

    return cloned;
  }

  cancel() {
    this.selectedAction = null;
    this.actionToEdit = null;
    this.newAction = false;
    this.displayActionEditorDialog = false;
  }

  /**
   * save() can be called from two scenarios one is a new action by pressing the plus sign
   *   and other when selecting an existing action on the listbox.
   */
  save() {
    console.log("CellActionComponent:save: length = " + this.action.length);
    //this.action = [...this.action, this.actionToEdit];
    console.log("CellActionComponent:save: length = " + this.action.length);

    this.actionChanged.emit(this.actionToEdit);
    this.selectedAction = null;
    this.newAction = false;
    this.displayActionEditorDialog = false;
  }

  delete() {
  }

  onActionChange(event) {
    console.log('CellActionComponent:onActionChange: event = ' + JSON.stringify(event, undefined, 2));
  }

  onClick(event) {
    console.log('CellActionComponent:save: this.onClick event = ' + JSON.stringify(event));
    console.log('CellActionComponent:save: this.onClick event.value.name = ' + JSON.stringify(event.value.name));
    console.log('CellActionComponent:save: this.onClick this.action[0] = ' + JSON.stringify(this.action[0]));
    console.log('CellActionComponent:save: this.onClick index = ' + this.index);

    console.log('CellActionComponent:save: this.action = ' + JSON.stringify(this.action, undefined, 2));


    this.selectedAction = this.action.filter(item => item.action === event.value.action)[0];

    console.log("selectedAction = " + JSON.stringify(this.selectedAction, undefined, 2));

    this.newAction = false;
    this.actionToEdit = this.cloneAction(this.selectedAction);
    this.actionToEdit.ruleId = this.index;
    this.displayActionEditorDialog = true;
  }

}
