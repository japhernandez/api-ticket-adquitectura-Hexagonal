import { Model, DataTypes } from 'sequelize';
import db from '../../connection';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { TicketModel } from './Ticket.model';

export interface UserModel extends Model {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
    age: number;
}

export const UserModel = db.define<UserModel>('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    },
    timestamps: false
});


