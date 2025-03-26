import React, { useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaHeading, FaFolder, FaExclamationCircle, FaImage } from "react-icons/fa"; 

function CreateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryInfo, setCategoryInfo] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [subCategories, setSubCategories] = useState([""]);
  const [categoryImage, setCategoryImage] = useState(null);

  const handleCategoryNameChange = (e) => setCategoryName(e.target.value);
  const handleCategoryInfoChange = (e) => setCategoryInfo(e.target.value);
  const handleParentCategoryChange = (e) => setParentCategory(e.target.value);
  const handleImageChange = (e) => setCategoryImage(e.target.files[0]);

  const handleSubCategoryChange = (index, value) => {
    const newSubCategories = [...subCategories];
    newSubCategories[index] = value;
    setSubCategories(newSubCategories);
  };

  const addSubCategory = () => setSubCategories([...subCategories, ""]);

  const saveCategory = () => {
    console.log("Category saved:", { categoryName, categoryInfo, parentCategory, subCategories, categoryImage });
  };

  const cancelCategory = () => {
    setCategoryName("");
    setCategoryInfo("");
    setParentCategory("");
    setSubCategories([""]);
    setCategoryImage(null);
  };

  return (
    <SAAdminLayout>
      {/* Yeh div ab full screen height aur width le raha hai */}
      <div className=" flex justify-center items-center bg-gray-100 py-4 px-6">
        <div className="bg-white shadow-lg rounded-lg w-full p-8 space-y-6">
          <div className="flex justify-between mb-6">
            <div className="flex space-x-4">
              <button onClick={saveCategory} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Save
              </button>
              <button onClick={cancelCategory} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Cancel
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Create Category
          </h1>
          <div className="space-y-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaHeading className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter category name"
                />
                <FaExclamationCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category Info</label>
              <textarea
                value={categoryInfo}
                onChange={handleCategoryInfoChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter category information"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Parent Category</label>
              <div className="relative">
                <FaFolder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <select
                  value={parentCategory}
                  onChange={handleParentCategoryChange}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Parent Category</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category Image</label>
              <div className="flex items-center">
                <FaImage className="mr-2 text-gray-500" />
                <input type="file" onChange={handleImageChange} className="p-2 border border-gray-300 rounded-md" />
              </div>
            </div>
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
              <button type="button" onClick={addSubCategory} className="text-blue-500 mt-2">
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
