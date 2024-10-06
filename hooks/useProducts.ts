import { useQuery } from '@tanstack/react-query';
import { getProductsList } from '@/services/product';
import { ProductResponse } from '@/services/product/product.type';

export const useProducts = ( sortValue?: string, categoryId?: string, subcategoryId?: string) => {
    return useQuery<ProductResponse, Error>({
        queryKey: ['products',  sortValue, categoryId, subcategoryId], // Use object form
        queryFn: () => getProductsList( sortValue, categoryId, subcategoryId) // Pass query function as 'queryFn'
    });
};
