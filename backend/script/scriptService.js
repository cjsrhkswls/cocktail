import { UserType } from "../code.js";
import { UserService } from "../user/userService.js";
import { reset } from './dml.js';
import { Service } from "../framework/service.js";

export class ScriptService extends Service {
    constructor(){
        super();
        this.userService = new UserService();
    }

    resetData = async (userId, key) => {
        this.checkId(userId);
        this.checkStringValue(key);

        if (key === process.env.RESET_KEY){
            reset();
        } else {
            this.throwError(`The key:${key} is not valid`);
        }
    }
}