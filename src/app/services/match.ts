export interface Match {
  id: number;
  name: string;
  rule: number;
  from: {type: string, data: any};
  what: {operator: string, data: any};
  match(src: any): any;
}
