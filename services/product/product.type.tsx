export type  TProduct  = {
    data: TProduct;
    _id: string;
    id?: string;
    description?:string;
    variations?: { value: string; type: string }[] | undefined;
    name: string;
    category: string;
    categoryId: string;
    subCategoryId: string;
    image: string[];
    descriptions?: string;
    price: number;
  }



  export type ProductResponse = {
    data: TProduct[]; 
  }