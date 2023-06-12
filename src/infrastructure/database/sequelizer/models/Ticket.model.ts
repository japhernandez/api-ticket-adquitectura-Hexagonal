import db from "../../connection";
import { Model, DataType, DataTypes } from "sequelize";
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

TicketModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    targetKey: 'id'
});