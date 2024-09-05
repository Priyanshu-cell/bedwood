'use client';

import React, { useState, useEffect } from 'react';
import {ProductCard} from './productCard';
import {Pagination} from './pagination';
import{ Header} from './header';
import { getDummyProducts } from '../../utils/dummyData';
import { Product } from '../../types';

export const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const perPage = 6;

    useEffect(() => {
        // Fetch dummy data on component mount
        const initialProducts = getDummyProducts();
        setProducts(initialProducts);
        setFilteredProducts(initialProducts);
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === selectedCategory));
        }
        setCurrentPage(1); // Reset to the first page when category changes
    }, [selectedCategory, products]);

    const totalPages = Math.ceil(filteredProducts.length / perPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Header selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    );
};