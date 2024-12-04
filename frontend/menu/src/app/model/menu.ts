export interface Menu {
    menuId: number,
    menuName: string,
    menuType: string,
    menuDescription: string,
    alcoholLevel: string,
}

export interface MenuWithOrder{
    menu:Menu,
    orderId: number,
    orderStatus: string,
}