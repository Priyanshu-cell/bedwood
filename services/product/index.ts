import { Api } from "../config";
import { ProductResponse, TProduct } from "./product.type";

const path = './product';

export const getProductsList = async ( sortValue?: string, categoryId?: string, subcategoryId?: string): Promise<ProductResponse> => {
    const params = new URLSearchParams();
    if ( sortValue) {
      
        params.append('priceSort', sortValue);  
    }
    if (categoryId){
        params.append('categoryId', categoryId);
    }
    if (categoryId && subcategoryId) {
        params.append('categoryId', categoryId);
        params.append('subcategoryId', subcategoryId);
    }
    
   
    return (await Api.get(path + "/list", { params })).data;
};

export const getProduct = async (id: string): Promise<TProduct | null> => {
    try {
      const response = await Api.get(`${path}/details`); // Fetch all products
      const productList: TProduct[] = response.data.data; // Extract product data array
      return productList.find(product => product._id === id) || null; // Find product by id
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };
  