import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/postregreSql";

export interface UserInstance extends Model {
    id: number;
    name: string;
    age: number;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('name');
            return rawValue ? rawValue.toUpperCase() : null;
        }
    },
    firstLetterofName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.getDataValue('name')[0]}`
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        set(value: number) {
            if (value < 18) {
                this.setDataValue('age', 18);
            }
        }
    }
}, {
    tableName: 'users',
    timestamps: false
});