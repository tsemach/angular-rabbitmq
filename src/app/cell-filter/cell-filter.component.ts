// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// import { Filter } from '../services/filter';

// @Component({
//   selector: 'app-cell-filter',
//   templateUrl: './cell-filter.component.html',
//   styleUrls: ['./cell-filter.component.css']
// })
// export class CellFilterComponent implements OnInit {
//   @Input() filter: Filter[];
//   @Input() index: number = -1;
//   @Output() filterChanged = new EventEmitter<Filter>();

//   selectedFilter: Filter;
//   filterToEdit: Filter = undefined;


//   constructor() { }

//   ngOnInit() {
//   }

//   onClick(event) {
//     console.log('this.filter >> ' + JSON.stringify(event));
//     console.log('this.filter >> ' + JSON.stringify(event.value.name));
//     console.log('this.filter >> ' + JSON.stringify(this.filter[0]));
//     console.log('this.filter >> ' + JSON.stringify(this.selectedFilter));
//     console.log('this.index = ' + this.index);
//   }
// }
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {SplitButtonModule} from 'primeng/components/splitbutton/splitbutton';

import { Filter } from '../services/filter';

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
  selector: 'app-cell-filter',
  templateUrl: './cell-filter.component.html',
  styleUrls: ['./cell-filter.component.css']
})
export class CellFilterComponent implements OnInit {
  @Input() filter: Filter[];
  @Input() index: number = -1;
  @Output() filterChanged = new EventEmitter<Filter>();

  selectedFilter: Filter;
  filterToEdit: Filter = undefined;

  types: Type[];
  operations: Operation[];
  selectedType: Type = {name: "Json", code: "Json"};
  selectedOperation: Operation;
  newFilter: boolean;
  filterIndex: number;
  isReadonly: boolean;

  displayFilterEditorDialog: boolean = false;

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

  createNewFilter() {
    console.log("CellFilterComponent:createNewFilter: index = " + this.index);
    return {
      "id": -1,
      "name": "",
      "rule": this.index,
      "from": {"type": "json", "data": ""},
      "what": {"operator": "", "data": ""},
      "filter": (any)=> {return any}
    };
  }

  showDialogToAdd() {
    this.newFilter = true;
    this.filterToEdit = this.createNewFilter();
    this.displayFilterEditorDialog = true;
    this.isReadonly = true;
  }

  cloneFilter(m: Filter): Filter {
    let cloned = Object.assign({}, m);
    console.log("cloneFilter: cloned = " + JSON.stringify(cloned));

    return cloned;
  }

  cancel() {
    this.selectedFilter = null;
    this.filterToEdit = null;
    this.newFilter = false;
    this.displayFilterEditorDialog = false;
  }

  /**
   * save() can be called from two scenarios one is a new filter by pressing the plus sign
   *   and other when selecting an existing filter on the listbox.
   */
  save() {
      console.log("FILTER length = " + this.filter.length);
    this.filter = [...this.filter, this.filterToEdit];
    console.log("FILTER length = " + this.filter.length);

    this.filterChanged.emit(this.filterToEdit);
    this.selectedFilter = null;
    this.newFilter = false;
    this.displayFilterEditorDialog = false;
  }

  delete() {
  }

  onTypeChange(event) {
    this.filterToEdit.from.type = this.selectedType.code;
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
    console.log('this.onClick this.filter[0] = ' + JSON.stringify(this.filter[0]));
    console.log('this.onClick index = ' + this.index);

    console.log('this.filter = ' + JSON.stringify(this.filter, undefined, 2));

    //Object.keys(this.filter).map((k) => console.log("item = " + JSON.stringify(this.filter[k], undefined, 2)));
    this.selectedFilter = this.filter.filter(item => item.name === event.value.name)[0];
    // console.log("m = " + JSON.stringify(m, undefined, 2));
    console.log("selectedFilter = " + JSON.stringify(this.selectedFilter, undefined, 2));

    this.newFilter = false;
    this.filterToEdit = this.cloneFilter(this.selectedFilter);
    this.filterToEdit.rule = this.index;
    this.displayFilterEditorDialog = true;
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

/*
[
  {"name":"is-field-include","from":
    {"type":"json","data":"msg.content.status"},
    "what":{"operator":"== to","data":"200"}
  },
  {"name":"is-field-not-include","from":
    {"type":"json","data":"msg.content.length"},"what":{"operator":"> from","data":"400"}
  }
  ]
*/
