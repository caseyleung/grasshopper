import request from "../../../utils/request";
import type { AllRoleResponseData, RoleData } from "./type";

enum API {
  ROLE_LIST_URL = "/admin/acl/role/",
  ROLE_ADD_URL = "/admin/acl/role/save",
  ROLE_UPDATE_URL = "/admin/acl/role/update",
  PERMISSION_LIST_URL = "/admin/acl/permission/toAssign",
  ASSIGN_PERMISSION_URL = "/admin/acl/permission/doAssign",
  DELETE_ROLE_URL = "/admin/acl/role/remove/",
}

export const reqRoleList = (page: number, limit: number, keyWord: string) => {
  return request.get<any, AllRoleResponseData>(
    API.ROLE_LIST_URL + `${page}/${limit}/?roleName=${keyWord}`
  );
};

export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.ROLE_UPDATE_URL, data);
  } else {
    return request.post<any, any>(API.ROLE_ADD_URL, data);
  }
};

export const reqPermissionList = (roleId: number) => {
  return request.get<any, any>(API.PERMISSION_LIST_URL + `/${roleId}`);
};

export const reqAssignPermission = (roleId: number, permissionId: number[]) => {
  return request.post<any, any>(API.ASSIGN_PERMISSION_URL, {
    roleId,
    permissionId,
  });
};

export const reqDeleteRole = (roleId: number) => {
  return request.delete<any, any>(API.DELETE_ROLE_URL + `${roleId}`);
};
