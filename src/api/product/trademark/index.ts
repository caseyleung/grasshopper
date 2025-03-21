import request from "../../../utils/request";
import type { TradeMark, TradeMarkResponseData } from "./type";

enum API {
  TRADEMARK_URL = "admin/product/baseTrademark/",
  ADDTRADEMARK_URL = "admin/product/baseTrademark/save",
  UPDATETRADEMARK_URL = "admin/product/baseTradmark/update",
}

export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`
  );
};

export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  // 有id修改品牌的数组
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
  } else {
    // 新增品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data);
  }
};
