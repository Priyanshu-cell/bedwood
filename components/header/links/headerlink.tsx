"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProductCategories } from "@/services/category";
import { HeaderLinkProps, LinkData } from "@/services/category/category.type";
import { selectedCategoryState } from "@/state/atoms/filterstate";
import { useRecoilState } from "recoil";
import { useSearchParams, useRouter } from "next/navigation"; // Import useRouter



export const HeaderLink: React.FC<HeaderLinkProps> = ({
  className,
  setSideBarOpen,
}) => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const [linkData, setLinkData] = useState<LinkData[]>([]);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<number | null>(null);
  const searchParams = useSearchParams(); // Initialize useSearchParams
  const router = useRouter(); // Initialize useRouter

  const useUserAgent = () => {
    const [userAgent, setUserAgent] = useState("");

    useEffect(() => {
      setUserAgent(navigator.userAgent);
    }, []);

    return userAgent;
  };

  const userAgent = useUserAgent();
  const isMobile = /Mobile|Android/i.test(userAgent);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductCategories();
        const data = await response;
        console.log("Data", data);
        if (data.success) {
          const formattedData = data.data.map((item) => ({
            _id: item._id ??"",
            name: item.name,
            logo: "", 
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

  // Set the category from the search params on component mount
  useEffect(() => {
    const categoryId = searchParams.get("categoryId"); // Extract categoryId from search parameters
    if (categoryId) {
      setSelectedCategory(categoryId); // Set Recoil state
    }
  }, [searchParams, setSelectedCategory]);

  const handleMobileMenuClick = (index: number) => {
    setOpenMobileSubMenu(openMobileSubMenu === index ? null : index);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const params = new URLSearchParams(window.location.search);
    params.set("categoryId", categoryId); // Set the category ID in the search parameters
    router.push(`/productlist?${params}`); // Use router.push for navigation
    if (setSideBarOpen) {
      setSideBarOpen(false);
    }
  };

  return (
    <nav className={`md:p-4 flex flex-col md:flex-row md:justify-center md:items-center text-md font-medium w-full max-w-7xl mx-auto ${className}`}>
      {linkData.map((link, index) => (
        <div
          key={index}
          className="relative flex flex-col md:flex-row md:items-center md:pl-0 pl-4 pt-4 pb-2 md:py-0 md:px-12 text-gray-700 bg-inherit md:hover:bg-inherit hover:bg-gray-100 hover:text-gray-900 whitespace-nowrap md:space-x-4 md:border-0 border-b border-gray-300 transition-all duration-300 ease-in-out"
          onMouseEnter={() => !isMobile && setActiveMenu(index)}
          onMouseLeave={() => !isMobile && setActiveMenu(null)}
        >
          <div
            onClick={() => isMobile && handleMobileMenuClick(index)}
            className="flex justify-between items-center w-full cursor-pointer px-2"
          >
            <div className="flex flex-row">
              <img
                src={link.logo}
                className="block md:hidden h-6 w-6 mr-2 rounded-full"
                alt={`${link.name} logo`}
              />
              <p
                className="block text-left px-2 md:px-0 md:hover:underline md:hover:underline-offset-8"
                onClick={() => handleCategoryClick(link._id)}
              >
                {link.name}
              </p>
            </div>
            {link.children && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`md:hidden h-6 w-6 text-gray-600 ml-2 transition-transform transform ${
                  openMobileSubMenu === index ? "rotate-90" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
          </div>

          {link.children && !isMobile && (
            <div
              className={`absolute z-50 top-5 left-0 w-48 bg-white shadow-lg border border-gray-300 rounded-md scale-95 transform transition-transform duration-300 ease-in-out ${
                activeMenu === index ? "block" : "hidden"
              }`}
            >
              {link.children.map((subLink, subIndex) => (
                <Link
                  key={subIndex}
                  href="/productlist"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200 ease-in-out"
                  onClick={() => handleCategoryClick(subLink._id)}
                >
                  {subLink.name}
                </Link>
              ))}
            </div>
          )}

          {link.children && isMobile && openMobileSubMenu === index && (
            <div className="w-full bg-inherit divide-y-2 mt-2 flex flex-col rounded-md transition-all duration-300 ease-in-out">
              {link.children.map((subLink, subIndex) => (
                <Link
                  key={subIndex}
                  href="/productlist"
                  onClick={() => setSideBarOpen(false)}
                  className="block px-2 text-sm py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200 ease-in-out"
                >
                  {subLink.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};
