export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

export interface UserList {
    id?: number,
    name?: string,
    password?: string,
    phone?: string,
    createTime?: string,
    updateTime?: string,
    username?: string,
    roleName?: string,
}

export interface UserListResponseData extends ResponseData {
    data: {
        records: UserList[],
        total: number,
        size: number,
        current: number,
        orders: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number,
    }
}

export interface RoleData {
    id: number,
    roleName: string,
    remark: string,
    createTime: string,
    updateTime: string,
}

export interface AllRoleResponseData extends ResponseData {
    data: {
        assignRoles: [],
        allRolesList: RoleData[],
    }
}

export interface SetRoleData {
    userId: number,
    roleIdList: number[],
}
