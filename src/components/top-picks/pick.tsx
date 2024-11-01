'use client'
import React, { useEffect, useState } from "react";
import { getProductCategories } from "@/src/services/category";
import { LinkData } from "@/src/services/category/category.type";
import { useRouter } from "next/navigation"; // Import the useRouter hook to handle navigation
import { ImSpinner2 } from "react-icons/im";

export const TopPicksSection: React.FC = () => {
  const [linkData, setLinkData] = useState<LinkData[]>([]);
  const router = useRouter(); // Initialize useRouter to programmatically navigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductCategories();
        if (response.success) {
          const formattedData = response.data.map((item) => ({
            _id: item._id ?? "",
            name: item.name,
            logo: item.image || "", 
            children: item.children || [],
          }));
          setLinkData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle navigation when a category is clicked
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/productlist?categoryId=${categoryId}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Top Picks For You</h2>
        <p className="text-lg text-gray-600">Impressive Collection for Your Dream Home</p>
      </div>
      <div className="relative overflow-x-auto scrollbar-hidden">
        <div className="flex items-center space-x-4">
          {linkData.length === 0 ? (
            <div className="flex justify-center items-center w-full">
              <ImSpinner2 className="animate-spin text-2xl" />
            </div>
          ) : (
            linkData.map((link) => (
              <div key={link._id} className="flex flex-col items-center">
                <div
                  className="relative overflow-hidden rounded-full bg-gray-200 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 cursor-pointer"
                  onClick={() => handleCategoryClick(link._id)}
                >
                  <img
                    src={link.logo}
                    alt={link.name}
                    title={link.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="mt-2 text-center text-xs lg:text-base font-medium">{link.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
