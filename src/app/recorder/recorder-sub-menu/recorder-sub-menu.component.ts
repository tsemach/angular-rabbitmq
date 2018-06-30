import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MenuItem } from 'primeng/components/common/api';
import {AddRuleService} from '../../services/add-rule.service';

@Component({
  selector: 'app-recorder-sub-menu',
  templateUrl: './recorder-sub-menu.component.html',
  styleUrls: ['./recorder-sub-menu.component.css']
})
export class RecorderSubMenuComponent implements OnInit {
  @Output() publish = new EventEmitter<null>();
  //@Output() newRule = new EventEmitter<null>();

  newItems: MenuItem[];

  constructor(private addRuleService: AddRuleService) { }

  ngOnInit() {
    this.newItems = [
      {
        label: 'Rule',
        icon: 'fa-minus',
        title: 'Create New Rule ..',
        //styleClass: "btn btn-link",
        command: (event) => {
          console.log("RecorderSubMenuComponent: event is called on Rule + " + JSON.stringify(event.item));
          this.onNewRule();
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
        }
      },
      {
        label: 'Group',
        icon: 'fa fa-bars',
        title: 'Create New Group of Rules ..'
      },
    ];
  }

  onNewRule() {
    console.log("RecorderSubMenuComponent:onNewRule: is called");
    //this.newRule.emit();
    this.addRuleService.ruleDialog.next();
  }

  onPublish() {
    console.log('RecorderSubMenuComponent:onPublish: publish is press');
    this.publish.emit();
  }
}
