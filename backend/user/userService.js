import { Service } from "../framework/service.js";
import { UserDataFacade } from "./userDataFacade.js";
import { UserStatus } from "../code.js";
import { EmailService } from "../framework/emailService.js";

export class UserService extends Service {
    constructor(){
        super();
        this.userDataFacade = new UserDataFacade();
        this.emailService = new EmailService();
    }

    getAllUsers = async () => {
        const result = await this.userDataFacade.getAllUsers();

        if (result.length < 1) {
            this.throwError('There is no user at all.. Please run reset script!');
        }
        return result;
    }

    getUserById = async (userId) => {
        this.checkId(userId);
        const result = await this.userDataFacade.getUserById(userId);
    
        if (!result || result === null) {
            this.throwError(`No user for user identifier:${userId}`);
        }

        return result;
    }

    getUserByEmail = async (userEmail) => {
        this.checkStringValue(userEmail);
        const result = await this.userDataFacade.getUserByEmail(userEmail);

        if (!result || result === null) {
            this.throwError(`No user email for user email:${userEmail}`);
        }

        return result;   
    }

    getAllUsersByType = async (userType) => {
        this.checkStringValue(userType);
        const result = await this.userDataFacade.getAllUsersByType(userType);

        if (!result || result === null) {
            this.throwError(`No users for user type:${userType}`);
        }

        return result;
    }

    createUser = async (newUser) => {
        this.checkObjectValue(newUser);
        this.checkStringValue(newUser.userEmail);
        this.checkStringValue(newUser.userNickname);
        const existingUser = await this.userDataFacade.getUserByEmail(newUser.userEmail);

        if (existingUser || existingUser !== null) {
            this.throwError(`The user to be created has a duplicate user email: ${newUser.userEmail}!!`);
        }

        await this.userDataFacade.createUser(newUser);

        const createdUser = await this.userDataFacade.getUserByEmail(newUser.userEmail);
        return createdUser;   
    }

    login = async (newUser) => {
        this.checkObjectValue(newUser);
        this.checkStringValue(newUser.userEmail);
        this.checkStringValue(newUser.userNickname);

        const users = await this.userDataFacade.getAllUsers();

        if (users.length > 100) {
            this.throwError(`login: Cannot proceed the login process since the number of users exceeds 50`);
        }

        const existingUser = await this.userDataFacade.getUserByEmail(newUser.userEmail);
        if (existingUser || existingUser !== null) {
            if (existingUser.userNickname !== newUser.userNickname){
                existingUser.userNickname = newUser.userNickname;
            }
            
            if (existingUser.userStatus === UserStatus.REJECTED) {
                existingUser.userStatus = UserStatus.APPROVAL_AWAITING;
            }
            
            await this.userDataFacade.updateUser(existingUser.userId, existingUser);
            
        } else {
            newUser.userStatus = UserStatus.APPROVAL_AWAITING;
            await this.userDataFacade.createUser(newUser);
            this.emailService.sendMailToOwnerForNewUser(newUser);
        }

        const createdUser = await this.userDataFacade.getUserByEmail(newUser.userEmail);
        return createdUser;
    }

    confirmUser = async (userData) => {
        userData.userStatus = UserStatus.CONFIRMED;
        const updatedUser = await this.updateUser(userData.userId, userData);
        if (updatedUser){
            this.emailService.sendMailToUserForUpdates(updatedUser);
        }
        return updatedUser;
    }

    rejectUser = async (userData) => {
        userData.userStatus = UserStatus.REJECTED;
        const updatedUser = await this.updateUser(userData.userId, userData);
        if (updatedUser){
            this.emailService.sendMailToUserForUpdates(updatedUser);
        }
        return updatedUser;
    }

    updateUser = async (userId, updateUser) => {
        this.checkObjectValue(updateUser);
        this.checkId(userId);
        this.checkStringValue(updateUser.userEmail);
        this.checkStringValue(updateUser.userNickname);

        const existingUser = await this.userDataFacade.getUserById(userId);

        if (!existingUser || existingUser === null) {
            this.throwError(`The user to be updated does not exist: ${userId}!!`);
        }

        const updatedRows = await this.userDataFacade.updateUser(userId, updateUser);
        
        if (updatedRows == 0) {
            this.throwError(`No user record to be updated for userId:${userId}`);
        } else {
            console.log(`User:${updateUser.userEmail} updated`);
            const updatedUser = await this.userDataFacade.getUserById(userId);
            return updatedUser;
        }
    }

    deleteUser = async (userId) => {
        this.checkId(userId);
        const existingUser = await this.userDataFacade.getUserById(userId);

        if (!existingUser || existingUser === null) {
            this.throwError(`The user to be deleted does not exist: ${userId}!!`);
        }

        const deletedRowCount = await this.userDataFacade.deleteUser(userId);

        if (deletedRowCount === 0) {
            console.log('No user record to be deleted');
        } else {
            console.log(`${deletedRowCount} rows deleted for ${existingUser.userEmail}`);
            return existingUser;
        }
    }
}