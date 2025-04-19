export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}

export interface Menu {
    id: number;
    name: string;
    createTime: string;
    updateTime: string;
    pid: number;
    type: number;
    status: number;
    code: string;
    toCode: string;
    level: number;
    children: Menu[];
    select: boolean;
}

export interface MenuResponseData extends ResponseData {
    data: Menu[];
}

export interface MenuParams {
    id?: number;
    name: string;
    code: string;
    type: number;
    pid: number;
    level?: number;
}
