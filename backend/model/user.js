import { DataTypes, Model } from "sequelize";
import { conn } from "../framework/databaseConnection.js";

export class User extends Model { }
User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
            }
        },
        userNickname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
    },
    {
        sequelize: conn,
        modelName: 'User'
    }
);