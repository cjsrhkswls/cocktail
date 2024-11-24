import { conn } from "../framework/databaseConnection.js"
import { User } from "../model/user.js"

export class UserDataFacade {
    constructor() {
        this.conn = conn;
        this.user = User;
    }

    getAllUsers = async () => {
        return await User.findAll();
    }

    getUserById = async (userId) => {
        return await User.findByPk(userId);
    }

    getUserByEmail = async (userEmail) => {
        return await User.findOne({
            where: { userEmail: userEmail }
        })
    }

    getAllUsersByType = async (userType) => {
        return await User.findAll({
            where: { userType: userType }
        })
    }

    createUser = async (newUser) => {
        await User.create(
            {
                userEmail: newUser.userEmail,
                userType: newUser.userType,
            })
            .catch(err => {
                console.log(err);
                return new Error(err);
            });
    }

    updateUser = async (userId, newUser) => {
        const [updatedRows] = await User.update(
            {
                userEmail: newUser.userEmail,
                userType: newUser.userType
            },
            {
                where: { userId: userId }
            })
            .catch(err => {
                console.log(err);
                return new Error(err);
            });
        return [updatedRows];
    }

    deleteUser = async (userId) => {
        const deletedRowCount = await User.destroy(
            {
                where: { userId: userId }
            })
            .catch(err => {
                console.log(err);
                return new Error(err);
            });

        return deletedRowCount;
    }
}