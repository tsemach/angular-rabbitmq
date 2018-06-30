import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {SplitButtonModule} from 'primeng/components/splitbutton/splitbutton';

import { Match } from '../services/match';

interface Type {
  name: string,
  code: string
}

enum OpTypeEnum {
  eq = 1,
  ne,
  ge,
  gt,
  le,
  lt
}

interface Operation {
  name: string,
  code: OpTypeEnum
}

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  DELETE = 46
}

@Component({
  selector: 'app-cell-match',
  templateUrl: './cell-match.component.html',
  styleUrls: ['./cell-match.component.css']
})
export class CellMatchComponent implements OnInit {
  @Input() match: Match[];
  @Input() index: number = -1;
  @Output() matchChanged = new EventEmitter<Match>();

  selectedMatch: Match;
  matchToEdit: Match = undefined;

  types: Type[];
  operations: Operation[];
  selectedType: Type = {name: "Json", code: "Json"};
  selectedOperation: Operation;
  newMatch: boolean;
  matchIndex: number;
  isReadonly: boolean;

  displayMatchEditorDialog: boolean = false;

  constructor() { }

  ngOnInit() {
    this.types = [
      {name: 'Json', code: 'Json'},
      {name: 'Text', code: 'Text'},
      {name: 'Buffer', code: 'Buffer'},
    ];

    this.operations = [
      {name: '==', code: OpTypeEnum.eq},
      {name: '>=', code: OpTypeEnum.le},
      {name: '!=', code: OpTypeEnum.ne},
    ];
  }

  createNewMatch() {
    return {
      "id": -1,
      "name": "",
      "rule": this.index,
      "from": {"type": "json", "data": ""},
      "what": {"operator": "", "data": ""},
      "match": (any)=> {return any}
    };
  }

  showDialogToAdd() {
    this.newMatch = true;
    this.matchToEdit = this.createNewMatch();
    this.displayMatchEditorDialog = true;
    this.isReadonly = true;
  }

  cloneMatch(m: Match): Match {
    let cloned = Object.assign({}, m);
    console.log("cloneMatch: cloned = " + JSON.stringify(cloned));

    return cloned;
  }

  cancel() {
    this.selectedMatch = null;
    this.matchToEdit = null;
    this.newMatch = false;
    this.displayMatchEditorDialog = false;
  }

  /**
   * save() can be called from two scenarios one is a new match by pressing the plus sign
   *   and other when selecting an existing match on the listbox.
   */
  save() {
    console.log("MATCH length = " + this.match.length);
    this.match = [...this.match, this.matchToEdit];
    console.log("MATCH length = " + this.match.length);

    this.matchChanged.emit(this.matchToEdit);
    this.selectedMatch = null;
    this.newMatch = false;
    this.displayMatchEditorDialog = false;
  }

  delete() {
  }

  onTypeChange(event) {
    this.matchToEdit.from.type = this.selectedType.code;
    console.log("onTypeChange: event.value = " + event.value.code);
    console.log("onTypeChange: event.value = " + JSON.stringify(this.selectedType));
  }

  onOperationChange(event) {
    console.log("onOperationChange: event.value = " + event.value.code);
    console.log("onOperationChange: event.value = " + JSON.stringify(this.selectedOperation));
  }

  onClick(event) {
    console.log('this.onClick event = ' + JSON.stringify(event));
    console.log('this.onClick event.value.name = ' + JSON.stringify(event.value.name));
    console.log('this.onClick this.match[0] = ' + JSON.stringify(this.match[0]));
    console.log('this.onClick index = ' + this.index);

    console.log('this.match = ' + JSON.stringify(this.match, undefined, 2));

    //Object.keys(this.match).map((k) => console.log("item = " + JSON.stringify(this.match[k], undefined, 2)));
    this.selectedMatch = this.match.filter(item => item.name === event.value.name)[0];
    // console.log("m = " + JSON.stringify(m, undefined, 2));
    console.log("selectedMatch = " + JSON.stringify(this.selectedMatch, undefined, 2));

    this.newMatch = false;
    this.matchToEdit = this.cloneMatch(this.selectedMatch);
    this.matchToEdit.rule = this.index;
    this.displayMatchEditorDialog = true;
  }

  // @HostListener('window:keyup', ['$event'])
  // keyEvent(event: KeyboardEvent) {
  //   console.log(event);

  //   if (event.keyCode === KEY_CODE.DELETE) {
  //     console.log("KEY: delete");
  //   }

  //   if (event.keyCode === KEY_CODE.LEFT_ARROW) {
  //     console.log("KEY: LEFT");
  //   }
  // }

}
