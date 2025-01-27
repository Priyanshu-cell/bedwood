export type  TProduct  = {
    data: TProduct;
    _id: string;
    id?: string;
    description?:string;
    variations?: { value: string; type: string; _id?: string | undefined}[] | undefined;
    name: string;
    category: string;
    categoryId: string;
    subCategoryId: string;
    image: string[];
    descriptions?: string;
    price: number;
  }

  export type ProductResponse = {
    success: any;
    message(message: any): unknown;
    data: TProduct[]; 
    extra: {
      total: number; // Total number of products
      limit: number; // Items per page
    };
  }