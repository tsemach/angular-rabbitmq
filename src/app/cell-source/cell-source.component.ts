import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source } from '../services/source';

@Component({
  selector: 'app-cell-source',
  templateUrl: './cell-source.component.html',
  styleUrls: ['./cell-source.component.css']
})
export class CellSourceComponent implements OnInit {
  @Input() source: Source[];
  @Input() index: number = -1;
  @Output() sourceChanged = new EventEmitter<Source>();

  selectedSource: Source;
  sourceToEdit: Source = this.createNewSource();

  newSource: boolean;
  sourceIndex: number;
  isReadonly: boolean;

  displaySourceEditorDialog: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  createNewSource() {
    return {
      "id": -1,
      "name": "",
      "ruleId": this.index,
    };
  }

  showDialogToAdd() {
    this.newSource = true;
    this.sourceToEdit = this.createNewSource();
    this.displaySourceEditorDialog = true;
    this.isReadonly = true;
  }

  cloneSource(s: Source): Source {
    let cloned = Object.assign({}, s);
    console.log("cloneSource: cloned = " + JSON.stringify(cloned));

    return cloned;
  }

  onCancel() {
    this.selectedSource = null;
    this.sourceToEdit = null;
    this.newSource = false;
    this.displaySourceEditorDialog = false;
  }

  /**
   * save() can be called from two scenarios one is a new source by pressing the plus sign
   *   and other when selecting an existing source on the listbox.
   */
  onSave() {
    console.log("CellSourceComponent:onSave: length = " + this.source.length);
    // if (this.newSource) {
    //   //this.source = [...this.source, this.sourceToEdit];
    //   this.source.push(this.sourceToEdit);
    // }
    // else {
    //   let i = this.source.findIndex((item) => { return item.id === this.sourceToEdit.id})
    //   console.log("CellSourceComponent:onSave: going to update item i = " + i);
    //   this.source[i] = this.sourceToEdit;
    // }
    // console.log("CellSourceComponent:onSave: length = " + this.source.length);
    // console.log("CellSourceComponent:onSave: this.source["+i+"]= " + JSON.stringify(this.source[i]));

    this.sourceChanged.emit(this.sourceToEdit);
    this.selectedSource = null;
    this.newSource = false;
    this.displaySourceEditorDialog = false;
  }

  delete() {
  }

  onClick(event) {
    console.log('this.onClick event = ' + JSON.stringify(event));
    console.log('this.onClick event.value.name = ' + JSON.stringify(event.value.name));
    console.log('this.onClick this.source[0] = ' + JSON.stringify(this.source[0]));
    console.log('this.onClick index = ' + this.index);

    console.log('this.source = ' + JSON.stringify(this.source, undefined, 2));

    //Object.keys(this.source).map((k) => console.log("item = " + JSON.stringify(this.source[k], undefined, 2)));
    this.selectedSource = this.source.filter(item => item.name === event.value.name)[0];
    // console.log("m = " + JSON.stringify(m, undefined, 2));
    console.log("selectedSource = " + JSON.stringify(this.selectedSource, undefined, 2));

    this.newSource = false;
    this.sourceToEdit = this.cloneSource(this.selectedSource);
    this.sourceToEdit.ruleId = this.index;
    this.displaySourceEditorDialog = true;
  }

  /*
    //@Input() source: string;
    @Input() source: Source[];
    @Input() index: number;
    @Output() sourceChanged = new EventEmitter<Source>();

    displaySourceEditorDialog: boolean = false;
    sourceToEdit: Source = undefined;
    newSource = false;
    sourceIndex: number;


    selectedSource: Source;
    //sourceToEdit: Source = undefined;
    //newSource: boolean;
    sourceIndex: number;
    isReadonly: boolean;

    constructor() { }

    ngOnInit() {
    }

    createNewSoruce() {
      return {
        id: -1,
        name: "",
        rule: this.index
      };
    }

    showDialogToAdd() {
      this.newSource = true;
      this.sourceToEdit = this.source;
      this.displaySourceEditorDialog = true;
    }

    onClick(event) {
      console.log('this.source >> ' + JSON.stringify(event));
      console.log('this.source >> ' + JSON.stringify(this.source));
      console.log('this.index = ' + this.index);
      this.displaySourceEditorDialog = true;
    }

    onSave(event) {
      this.source = this.sourceToEdit;
      this.displaySourceEditorDialog = false;
      this.sourceChanged.emit({name: this.source, rule: this.index});
    }

    onDelete(event) {
      this.displaySourceEditorDialog = false;
    }

    onCancel(event) {
      this.displaySourceEditorDialog = false;
    }
  */
}


