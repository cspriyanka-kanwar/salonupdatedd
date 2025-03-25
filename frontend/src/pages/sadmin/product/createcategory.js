import React, { useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaSearch } from "react-icons/fa"; // Assuming you're using React Icons for the search icon

function CreateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryInfo, setCategoryInfo] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [subCategories, setSubCategories] = useState([""]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  // Handling input changes
  const handleCategoryNameChange = (e) => setCategoryName(e.target.value);
  const handleCategoryInfoChange = (e) => setCategoryInfo(e.target.value);
  const handleParentCategoryChange = (e) => setParentCategory(e.target.value);

  const handleSubCategoryChange = (index, value) => {
    const newSubCategories = [...subCategories];
    newSubCategories[index] = value;
    setSubCategories(newSubCategories);
  };

  const addSubCategory = () => {
    setSubCategories([...subCategories, ""]);
  };

  const saveCategory = () => {
    // Logic to save category
    console.log("Category saved:", { categoryName, categoryInfo, parentCategory, subCategories });
  };

  const cancelCategory = () => {
    // Logic to cancel and reset form
    setCategoryName("");
    setCategoryInfo("");
    setParentCategory("");
    setSubCategories([""]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  return (
    <SAAdminLayout>
      {/* Main container with margin and center alignment */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-4 px-6">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 space-y-6">

          {/* Header: Search Bar with Search Icon */}
          <div className="flex justify-between mb-6">
            {/* Left side: Search Bar */}
            {/* <div className="flex items-center space-x-2">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Search Categories"
              />
            </div> */}

            {/* Right side: Save and Cancel buttons */}
            <div className="flex space-x-4">
              <button
                onClick={saveCategory}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={cancelCategory}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Title Section */}
          <h1 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg shadow-blue-500/50">
            Create Category
          </h1>

          {/* Category Form */}
          <div className="space-y-6">
            {/* Category Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={handleCategoryNameChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter category name"
              />
            </div>

            {/* Category Info */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category Info</label>
              <textarea
                value={categoryInfo}
                onChange={handleCategoryInfoChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter category information"
              />
            </div>

            {/* Parent Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Parent Category</label>
              <select
                value={parentCategory}
                onChange={handleParentCategoryChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Parent Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
            </div>

            {/* Subcategories */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Subcategories</label>
              {subCategories.map((subCategory, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={subCategory}
                    onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder={`Subcategory ${index + 1}`}
                  />
                  {subCategories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newSubCategories = subCategories.filter((_, i) => i !== index);
                        setSubCategories(newSubCategories);
                      }}
                      className="ml-2 text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSubCategory}
                className="text-blue-500 mt-2"
              >
                Add Subcategory
              </button>
            </div>
          </div>
        </div>
      </div>
    </SAAdminLayout>
  );
}

export default CreateCategory;
