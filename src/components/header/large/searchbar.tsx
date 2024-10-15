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

        // Filter only subcategories that match the search
        const filteredSubCategories: SubMenuItem[] = categoriesResponse.data.flatMap((category) => {
          const subCategoryMatches = category.children?.filter((subCategory) =>
            subCategory.name.toLowerCase().includes(searchValue.toLowerCase())
          ) || [];

          return subCategoryMatches.map((subCategory) => ({
            _id: subCategory._id || "",
            name: subCategory.name,
          }));
        });

        // Filter products based on the search value
        const filteredProducts = productsResponse.data.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        // Combine product suggestions and subcategories
        setSuggestions([...filteredSubCategories, ...filteredProducts]);
        setNoResults(filteredSubCategories.length === 0 && filteredProducts.length === 0);
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

    // Check if the suggestion is a product or a subcategory
    if ("categoryId" in suggestion) {
      // It's a product
      window.location.href = `/productlist?query=${encodeURIComponent(suggestion.name)}`;
    } else {
      // It's a subcategory
      const { _id } = suggestion;
      window.location.href = `/productlist?subcategoryId=${encodeURIComponent(_id)}`;
    }
  };

  return (
    <div className="relative flex-grow w-64">
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
