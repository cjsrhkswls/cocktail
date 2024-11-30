export abstract class AlcoholLevel {
    static readonly LOW = "Low";
    static readonly MEDIUM = "Medium";
    static readonly HIGH = "High";
    static readonly NONE = "None";
}

export abstract class MenuType {
    static readonly COCKTAIL = "Cocktail";
    static readonly FOOD = "Food";
}

export abstract class UserType{
    static readonly ADMIN = "Admin";
    static readonly CUSTOMER = "Customer";
    static readonly STAFF = "Staff";
}

export abstract class OrderStatus {
    static readonly REQUESTED = "Requested";
    static readonly REJECTED = "Rejected";
    static readonly CANCELED = "Cancelled";
    static readonly COMPLETED = "Completed";
}