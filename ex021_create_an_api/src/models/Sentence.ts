import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../instances/postgresql';

export interface SentenceInstance extends Model {
    id: number;
    author: string;
    txt: string;
}

export const Sentence = sequelize.define<SentenceInstance>('Sentence', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    txt: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'sentences',
    timestamps: false
})