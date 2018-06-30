class MatchInterface {
    id: number;
    ruleId: number;    
    name: string;
    rule: number;
    from: {type: string, data: any};
    what: {operator: string, data: any};
    match: () => {};
}

// let MatchInterfaceDefault = {
//     "name": '', 
//     "rule": -1, 
//     "from": {"type": '', "data": new Buffer('')}, 
//     "what": {"operator": '', "data": new Buffer('')}, 
//     match: ()=>{}
// };

export { MatchInterface }