import {Table, Column, Model, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import { MatchModel } from './match.model';

@Table({tableName: 'Rules'})
export class RuleModel extends Model<RuleModel> {

    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    // @HasMany(() => MatchModel)
    // matchs: MatchModel[];
    
    @Column
    name: string;

    @Column
    userId: number;

    @Column
    groupId: number;

    @Column
    isOn: boolean;

    @Column
    hit: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}