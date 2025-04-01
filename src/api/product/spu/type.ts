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

export interface Trademark {
  id: number;
  tmName: string;
  logoUrl: string;
}

export interface AllTrademark extends ResponseData {
  data: Trademark[];
}

export interface SpuImage {
  id: number;
  createTime?: string;
  updateTime?: string;
  spuId: number;
  imgName: string;
  imgUrl: string;
}

export interface SpuHasImg extends ResponseData {
  data: SpuImage[];
}

export interface SaleAttrValue {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  isCheck: boolean;
}

export type spuSaleAttrValueList = SaleAttrValue[];

export interface SaleAttr {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: spuSaleAttrValueList;
}

export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

export interface HasSaleAttr {
  id: number;
  name: string;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}
