
class RuleInterface {
    ruleId: number;
    name: string;
    userId: number;
    groupId: number;
    isOn: boolean;
    hit: number;
}

// let RuleInterfaceDefault = {
//     ruleId: -1,
//     name: '',
//     userId: 0,    
//     groupId: 0,
//     isOn: true,
//     hit: -1
// };

export { RuleInterface }