import { DataTypes, Model } from "sequelize";
import { sequelize } from "../intances/postgres";

export interface UserInstance extends Model {
    id: number;
    email: string;
    password: string;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'users'
});