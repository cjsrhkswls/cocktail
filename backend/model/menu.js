import { DataTypes, Model } from "sequelize";
import { conn } from "../framework/databaseConnection.js";

export class Menu extends Model { }
Menu.init(
    {
        menuId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                notEmpty: true,
            }
        },
        menuName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        menuType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        menuDescription: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            }
        },
        alcoholLevel: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            }
        },
    },
    {
        sequelize: conn,
        modelName: 'Menu',
    },
);

Menu.associate = (models) => {
    Menu.belongsToMany(models.User, {
        through: models.Order,
        foreignKey: 'menuId',
        otherKey: 'userId'
    });
};
