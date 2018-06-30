export interface Filter {
  id: number;
  name: string;
  rule: number;
  from: {type: string, data: any};
  what: {operator: string, data: any};
  filter(src: any): any;
}
