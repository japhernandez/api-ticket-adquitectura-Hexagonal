import { Model, DataTypes } from 'sequelize';
import db from '../../connection';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from "./User.model";

export interface TicketModel extends Model {
    id: string,
    userId: string,
    title: string,
    description: string,
    status: string,
}

export const TicketModel = db.define<TicketModel>('tickets', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

