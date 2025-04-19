import request from "../../../utils/request";
import type {
  AllRoleResponseData,
  UserList,
  UserListResponseData,
} from "./type";

enum API {
  USER_LIST_URL = "/admin/acl/user/",
  USER_ADD_URL = "/admin/acl/user/save",
  USER_UPDATE_URL = "/admin/acl/user/update",
  ALL_ROLE_URL = "/admin/acl/user/toAssign",
  ASSIGN_ROLE_URL = "/admin/acl/user/doAssignRole",
  DELETE_USER_URL = "/admin/acl/user/remove",
  BATCH_DELETE_USER_URL = "/admin/acl/user/batchRemove",
}

export const reqUserList = (page: number, limit: number, keyWord: string) => {
  return request.get<any, UserListResponseData>(
    API.USER_LIST_URL + `${page}/${limit}/?username=${keyWord}`
  );
};

export const reqAddOrUpdateUser = (data: UserList) => {
  if (data.id) {
    return request.put<any, any>(API.USER_UPDATE_URL, data);
  } else {
    return request.post<any, any>(API.USER_ADD_URL, data);
  }
};

export const reqAllRole = (userId: number) => {
  return request.get<any, AllRoleResponseData>(API.ALL_ROLE_URL + `/${userId}`);
};

export const reqAssignRole = (userId: number, roleIdList: number[]) => {
  return request.post<any, any>(API.ASSIGN_ROLE_URL, {
    userId,
    roleIdList,
  });
};

export const reqDeleteUser = (userId: number) => {
  return request.delete<any, any>(API.DELETE_USER_URL + `/${userId}`);
};

export const reqBatchDeleteUser = (userIds: number[]) => {
  return request.delete<any, any>(API.BATCH_DELETE_USER_URL, {
    data: userIds,
  });
};
