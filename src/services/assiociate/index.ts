
import { Api } from "../config";
import { TAssociate } from "./assiociate.type";
 

const path = '/assiociate';

export const associatePost = async (data: TAssociate): Promise<TAssociate> => {
    return (await Api.post(path + '/save' , data)).data; 
}
