
import {Table, Column, Model, CreatedAt, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {RuleModel} from "./rule.model";

@Table({tableName: 'Sources'})
export class SourceModel extends Model<SourceModel> {
    
    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @Column
    name: string;
    
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