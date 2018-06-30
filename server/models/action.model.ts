
import {Table, Column, Model, CreatedAt, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {RuleModel} from "./rule.model";

@Table({tableName: 'Actions'})
export class ActionModel extends Model<ActionModel> {

    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @Column
    action: string;
    
    @ForeignKey(() => RuleModel)
    @Column
    ruleId: number;

    // @BelongsTo(() => RuleModel)
    // rule: RuleModel;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}