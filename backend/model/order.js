import { DataTypes, Model } from "sequelize";
import { conn } from "../framework/databaseConnection.js";

export class Order extends Model { }
Order.init(
    {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                notEmpty: true,
            }
        },
        orderStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }
    },
    {
        indexes: [
            {
                unique: false,
                fields: ['userId', 'menuId']
            }
        ],
        sequelize: conn,
        modelName: 'Order',
    }
);

// Order.associate = (models) => {
//     Order.belongsTo(models.User, {
//         foreignKey: 'userId',
//         onDelete: 'CASCADE',
//     });

//     Order.belongsTo(models.Menu, {
//         foreignKey: 'menuId',
//         onDelete: 'CASCADE',
//     });
// };
