
  
import { Api } from "../config";
import { TCatgeoryApiResponse } from "./category.type";



const path = '/category';


export const getProductCategories = async (): Promise<TCatgeoryApiResponse> => {
    const response = await Api.get(path + '/list-menu');
    return response.data; 
}
