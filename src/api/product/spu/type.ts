interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: string | number;
  tmId: number | string;
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
  id?: number;
  name: string;
  url: string;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  imgName?: string;
  imgUrl?: string;
}

export interface SpuHasImg extends ResponseData {
  data: SpuImage[];
}

export interface SaleAttrValue {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  isChecked?: any;
}

export type spuSaleAttrValueList = SaleAttrValue[];

export interface SaleAttr {
  id?: number;
  createTime?: string;
  updateTime?: string;
  // spuId?: number;
  name?: string;
  baseSaleAttrId?: number;
  saleAttrName?: string;
  spuSaleAttrValueList?: spuSaleAttrValueList;
  editing?: boolean;
  spuSaleAttrValue?: string;
  saleIdAndValueId?: string;
}

export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

export interface HasSaleAttr {
  id?: number;
  name: string;
  createTime?: string;
  updateTime?: string;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}

export interface SkuData {
  category3Id: number | string;
  spuId: number | string;
  skuName: string;
  tmId: number | string;
  price: number;
  weight: number;
  skuDesc: string;
  skuAttrValueList?: {
    attrId: number | string;
    valueId: number | string;
  }[];
  skuDefaultImg: string;
  skuSaleAttrValueList?: {
    saleAttrId: number | string;
    saleAttrValueId: number | string;
  }[];
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[];
}