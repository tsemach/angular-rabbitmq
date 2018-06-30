import { Subject } from 'rxjs/Subject';

export class AddRuleService {
  /**
   * A Subject is an Observable and Observer in the same time
   * (the one that generate the data and one that receive it)
   */
  ruleDialog = new Subject();   // event to open new rule dialog
  nameDialog = new Subject();   // event to open an existing rule dialog
  addNewRule = new Subject();   // event to add new rule to rulebase
  updateRule = new Subject();   // event to update an existing rule in the rulebase
}
