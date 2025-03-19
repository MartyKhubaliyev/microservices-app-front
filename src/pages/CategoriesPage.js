import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editCategory, setEditCategory] = useState(null);

  // Fetch all categories
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Category")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories", error));
  }, []);

  // Create category
  const handleCreateCategory = () => {
    const newCategory = {
      name: categoryName,
    };
    axios
      .post("http://localhost:5000/api/Category", newCategory)
      .then(() => {
        setCategories([...categories, newCategory]);
        setCategoryName("");
      })
      .catch((error) => console.error("Error creating category", error));
  };

  // Update category
  const handleUpdateCategory = (id) => {
    const updatedCategory = {
      id,
      name: categoryName,
    };
    axios
      .put("http://localhost:5000/api/Category", updatedCategory)
      .then(() => {
        setCategories(
          categories.map((category) =>
            category.id === id ? updatedCategory : category
          )
        );
        setCategoryName("");
        setEditCategory(null);
      })
      .catch((error) => console.error("Error updating category", error));
  };

  // Delete category
  const handleDeleteCategory = (id) => {
    axios
      .delete(`http://localhost:5000/api/Category/${id}`)
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((error) => console.error("Error deleting category", error));
  };

  return (
    <div>
      <h1>Categories</h1>
      <div>
        <h2>{editCategory ? "Edit Category" : "Create Category"}</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {editCategory ? (
          <button onClick={() => handleUpdateCategory(editCategory.id)}>
            Update Category
          </button>
        ) : (
          <button onClick={handleCreateCategory}>Create Category</button>
        )}
      </div>

      <h2>Category List</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => setEditCategory(category)}>Edit</button>
            <button onClick={() => handleDeleteCategory(category.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;