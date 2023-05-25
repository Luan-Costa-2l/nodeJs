import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/postgresql";

export interface TaskInstance extends Model {
    id: number;
    done: boolean;
    title: string;
}

export const Task = sequelize.define<TaskInstance>('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    title: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'node_todo_simple',
    timestamps: false,
});