class FilterInterface {
    id: number;
    ruleId: number;    
    name: string;
    rule: number;
    from: {type: string, data: any};
    what: {operator: string, data: any};
    filter: ()=>{};    
}

//let FilterInterfaceDefault = {name: '', rule: -1, from: {type: '', data: new Buffer('')}, what: {"operator": '', "data": new Buffer('')}, filter: ()=>{}};

export { FilterInterface, /*FilterInterfaceDefault*/}