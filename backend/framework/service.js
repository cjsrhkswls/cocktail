
export class Service {

    checkId(id){
        if (!(id instanceof Number)){
            id = parseInt(id);
        }

        if (id < 1){
            throw new Error(`The given identifier:${id} should be higher than 0`);
        }
    }

    checkStringValue(value){
        if(!(value instanceof String)){
            value = value.trim();
        }

        if (value.length < 1){
            throw new Error(`The given value:${value} should not be empty`);
        }
    }

    checkObjectValue(value){
        if(!value || value === null){
            throw new Error('The given object value should not be undefined or null');
        }
    }

    throwError(msg){
        this.checkStringValue(msg);
        console.log(msg);
        throw new Error(msg);
    }
}