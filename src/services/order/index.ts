import { Api } from "../config";
import { TOrder } from "./order.type";

const path = '/order'

export const OrderPost = async (data: TOrder): Promise<TOrder> => {
    return (await Api.post(path + '/save' , data)).data;
}