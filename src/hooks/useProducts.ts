import { useQuery } from '@tanstack/react-query';
import { getProductsList } from '@/src/services/product';
import { ProductResponse } from '@/src/services/product/product.type';

export const useProducts = ( sortValue?: string, categoryId?: string, subcategoryId?: string, pageNo?: number) => {
    return useQuery<ProductResponse, Error>({
        queryKey: ['products',  sortValue, categoryId, subcategoryId,pageNo], // Use object form
        queryFn: () => getProductsList( sortValue, categoryId, subcategoryId,pageNo) // Pass query function as 'queryFn'
    });
};
