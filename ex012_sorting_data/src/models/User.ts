import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/postgresql";

interface UserInstance extends Model {
    id: number;
    name: string;
    age: number;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 18
    }
}, {
    tableName: 'users',
    timestamps: false
});