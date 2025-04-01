import request from "../../../utils/request";
import type {
  AllTrademark,
  HasSaleAttrResponseData,
  HasSpuResponseData,
  SaleAttrResponseData,
  SpuHasImg,
} from "./type";

enum API {
  HAS_SPU_URL = "/admin/product/",
  ALL_TRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
  SPU_IMAGE_LIST_URL = "/admin/product/spuImageList/",
  SPU_SALE_ATTR_LIST_URL = "admin/product/spuSaleAttrList/",
  ALL_SALE_ATTR_LIST = "admin/product/baseSaleAttrList",
}

export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string
) => {
  return request.get<any, HasSpuResponseData>(
    API.HAS_SPU_URL + `${page}/${limit}?category3Id=${category3Id}`
  );
};

export const reqAllTrademark = () =>
  request.get<any, AllTrademark>(API.ALL_TRADEMARK_URL);

export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.SPU_IMAGE_LIST_URL + spuId);

export const reqSpuSaleAttrList = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPU_SALE_ATTR_LIST_URL + spuId);

export const reqAllSaleAttrList = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALL_SALE_ATTR_LIST);
