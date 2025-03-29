import request from "../../../utils/request";
import type { AttrResponseData, CategoryResponseData, Attr } from "./type";

enum API {
  C1_URL = "/admin/product/getCategory1",
  C2_URL = "/admin/product/getCategory2/",
  C3_URL = "/admin/product/getCategory3/",
  ATTR_URL = "/admin/product/attrInfoList/",
  ADD_OR_UPDATE_ATTR_URL = "/admin/product/saveAttrInfo",
}

export const reqC1 = () => {
  return request.get<any, CategoryResponseData>(API.C1_URL);
};

export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id);

export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id);

export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) => {
  return request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`
  );
};

export const reqAddOrUpdateAttr = (data: Attr) => {
  return request.post<any, any>(API.ADD_OR_UPDATE_ATTR_URL, data);
};
