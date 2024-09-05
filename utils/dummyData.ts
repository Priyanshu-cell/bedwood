// utils/dummyData.ts
import { Product } from '../types';

export const getDummyProducts = (): Product[] => {
    return Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
        price: `$${(Math.random() * 100).toFixed(2)}`,
        imageUrl: `https://via.placeholder.com/384x384.png?text=Product+${index + 1}`,
        discount: index % 5 === 0 ? '20% Off' : undefined,
        category: index % 3 === 0 ? 'Sofa' : index % 3 === 1 ? 'Bed' : 'Tables',
    }));
};
