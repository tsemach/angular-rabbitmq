
import {Table, Column, Model, CreatedAt, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {RuleModel} from "./rule.model";

@Table({tableName: 'Matchs'})
export class MatchModel extends Model<MatchModel> {

    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @Column
    name: string;

    @ForeignKey(() => RuleModel)
    @Column
    ruleId: number;

    // @BelongsTo(() => RuleModel)
    // rule: RuleModel;

    @Column
    from: Buffer;

    @Column
    type: string;

    @Column
    what: Buffer;

    @Column
    operator: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}
