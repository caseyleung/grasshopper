interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: string | number;
  tmId: number;
  spuSaleAttrList?: any[] | null;
  spuImageList?: any[] | null;
  spuPosterList?: any[] | null;
}

export type Records = SpuData[];

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
