import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { searchState } from "@/src/state/atoms/searchState";
import { getProductsList } from "@/src/services/product";
import { getProductCategories } from "@/src/services/category"; // Import the category fetching function
import { TProduct } from "@/src/services/product/product.type"; // Ensure this is the correct import
import { TCategory, SubMenuItem } from "@/src/services/category/category.type"; // Ensure this is the correct import

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const setSearchQuery = useSetRecoilState(searchState);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<(TProduct | SubMenuItem)[]>([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchValue) {
        const productsResponse = await getProductsList();
        const categoriesResponse = await getProductCategories();
  
        // Filter products
        const filteredProducts = productsResponse.data.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        );
  
        // Filter categories and subcategories
        const filteredCategories: SubMenuItem[] = categoriesResponse.data.flatMap((category) => {
          const categoryMatches = category.name.toLowerCase().includes(searchValue.toLowerCase());
          const subCategoryMatches = category.children?.filter((subCategory) =>
            subCategory.name.toLowerCase().includes(searchValue.toLowerCase())
          ) || [];
  
          const result: SubMenuItem[] = [];
  
          if (categoryMatches) {
            result.push({
              _id: category._id || "",
              name: category.name
            });
          }
  
          subCategoryMatches.forEach((subCategory) => {
            result.push({
              _id: subCategory._id || "", // Ensure this is a string
              name: subCategory.name
            });
          });
  
          return result;
        });
  
        // Combine product and category suggestions
        setSuggestions([...filteredProducts, ...filteredCategories]);
        setNoResults(filteredProducts.length === 0 && filteredCategories.length === 0);
      } else {
        setSuggestions([]);
        setNoResults(false);
      }
    };
  
    fetchSuggestions();
  }, [searchValue]);

  const handleSearch = () => {
    setSearchQuery(searchValue);
    setSearchValue("");
    setSuggestions([]);
    if (searchValue) {
      // Redirect to product list page with search query
      window.location.href = `/productlist?query=${encodeURIComponent(searchValue)}`;
    }
  };

  const handleSuggestionClick = (suggestion: TProduct | SubMenuItem) => {
    setSearchValue("");
    setSuggestions([]);

    // Redirect based on whether the suggestion is a product or category
    if ("categoryId" in suggestion) {
      // It's a product
      window.location.href = `/productlist?query=${encodeURIComponent(suggestion.name)}`;
    } else {
      // It's a category or subcategory
      window.location.href = `/productlist?category=${encodeURIComponent(suggestion.name)}`;
    }
  };

  return (
    <div className="relative flex-grow w-64 ">
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="p-1 border border-gray-300 bg-white rounded-md w-full"
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
        {searchValue && (
          <FaTimes
            className="text-gray-600 text-lg cursor-pointer"
            onClick={() => setSearchValue("")}
          />
        )}
        <FaSearch
          className="text-gray-600 text-xl cursor-pointer"
          onClick={handleSearch}
        />
      </div>
      {suggestions.length > 0 ? (
        <div className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-60 overflow-auto z-50">
          {suggestions.map((suggestion) => (
            <div
              key={(suggestion as TProduct)._id || (suggestion as SubMenuItem)._id} // Ensure this key is unique
              onClick={() => handleSuggestionClick(suggestion)} // Use the new handler
            >
              <div className="p-2 hover:bg-gray-200 cursor-pointer text-sm">
                {(suggestion as TProduct).name || (suggestion as SubMenuItem).name}
              </div>
            </div>
          ))}
        </div>
      ) : noResults ? (
        <div className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-60 overflow-auto z-50">
          <div className="p-2 text-gray-600 text-sm">No results found</div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
