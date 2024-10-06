
import { Api } from "../config";


const path = '/category';


export const getProductCategories = async (): Promise<[]> => {
    const response = await Api.get(path + '/list-menu');
    return response.data; 
}
