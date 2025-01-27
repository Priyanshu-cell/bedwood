
  
import { Api } from "../config";
import { TCatgeoryApiResponse } from "./category.type";



const path = '/productlist';


export const getProductCategories = async (): Promise<TCatgeoryApiResponse> => {
    try {
        console.log('Making API request to:', path);  // Log the API request
        const response = await Api.get(path );
        console.log('API response data:', response.data);  // Log the API response
        return response.data;
    } catch (error) {
        console.error('Failed to fetch product categories:', error);
        throw error;  // Throw error to propagate it
    }
};

