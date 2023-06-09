import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../instances/postgresql';

export interface UserInstance extends Model {
    id: number;
    email: string;
    password: string;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
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
    tableName: 'users',
    timestamps: false
})