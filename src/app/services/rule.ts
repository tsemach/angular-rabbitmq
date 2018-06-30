import { Source } from './source';
import { Filter } from './filter';
import { Match } from './match';
import { Action } from './action';

export interface Rule {
    name: string;
    ruleId: number;
    source: Source[];
    filter: Filter[];
    match: Match[];
    action: Action[];
}
