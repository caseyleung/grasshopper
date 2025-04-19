export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}

export interface RoleData {
    id?: number;
    roleName: string;
    remark?: string;
    createTime?: string;
    updateTime?: string;
}

export interface AllRoleResponseData extends ResponseData {
    data: {
        records: RoleData[];
        total: number;
        size: number;
        current: number;
        pages: number;
        optimizeCountSql: boolean;
        hitCount: boolean;
        countId: string;
        maxLimit: string;
        searchCount: boolean;
    }
}

export interface MenuData {
    id: number;
    createTime: string;
    updateTime: string;
    pid: number;
    name: string;
    code: string;
    toCode: string;
    type: number;
    status: number;
    level: number;
    children: MenuData[];
    select: boolean;
}

export interface AllMenuResponseData extends ResponseData {
    data: MenuData[];
}

