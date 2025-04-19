import request from "../../../utils/request";
import type { MenuParams } from "./type";
import type { MenuResponseData } from "./type";

const API = {
    GET_MENU_LIST: '/admin/acl/permission',
    ADD_MENU: '/admin/acl/permission/save',
    UPDATE_MENU: '/admin/acl/permission/update',
    DELETE_MENU: '/admin/acl/permission/remove/',
}

export const reqMenuList = () => {
    return request.get<any, MenuResponseData>(API.GET_MENU_LIST);
}

export const reqAddOrUpdateMenu = (data: MenuParams) => {
    if (data.id) {
        return request.post<any, any>(API.UPDATE_MENU, data);
    } else {
        return request.post<any, any>(API.ADD_MENU, data);
    }
}

export const reqDeleteMenu = (id: number) => {
    return request.delete<any, any>(API.DELETE_MENU + id);
}
