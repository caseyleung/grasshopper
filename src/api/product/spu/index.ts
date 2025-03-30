import request from "../../../utils/request";
import type { HasSpuResponseData } from "./type";

enum API {
  HAS_SPU_URL = "/admin/product/",
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
