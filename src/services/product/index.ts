import { Api } from "../config";
import { ProductResponse, TProduct } from "./product.type";

const path = './product';


export const getProductsList = async (
    sortValue?: string,
    categoryId?: string,
    subCategoryId?: string,
    pageNo?: number // Add pageNo parameter
  ): Promise<ProductResponse> => {
    const params = new URLSearchParams();
  
    if (sortValue) {
      params.append('priceSort', sortValue);
    }
    if (categoryId) {
      params.append('categoryId', categoryId);
    }
    if (subCategoryId) {
      params.append('subCategoryId', subCategoryId);
    }
    if (pageNo) {
      params.append('page', pageNo.toString()); // Append pageNo as 'page'
    }
  
    return (await Api.get(path + "/list?", { params })).data;
  };
  

export const getProduct = async (id: string): Promise<TProduct | null> => {
    try {
       const response = await Api.get(`${path}/details/` + id); // Fetch all products
      const productList: TProduct[] = response.data.data; // Extract product data array
      return productList.find(product => product._id === id) || null; // Find product by id
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };
  
