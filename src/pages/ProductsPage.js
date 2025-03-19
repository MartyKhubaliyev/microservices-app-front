import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  // Fetch all products
  useEffect(() => {
    axios
      .get("https://localhost:7064/api/Product")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  // Create product
  const handleCreateProduct = () => {
    const newProduct = {
      name: productName,
      category: categoryId,
    };
    axios
      .post("https://localhost:7064/api/Product", newProduct)
      .then(() => {
        setProducts([...products, newProduct]);
        setProductName("");
        setCategoryId("");
      })
      .catch((error) => console.error("Error creating product", error));
  };

  // Update product
  const handleUpdateProduct = (id) => {
    const updatedProduct = {
      id,
      name: productName,
      category: categoryId,
    };
    axios
      .put("https://localhost:7064/api/Product", updatedProduct)
      .then(() => {
        setProducts(
          products.map((product) =>
            product.id === id ? updatedProduct : product
          )
        );
        setProductName("");
        setCategoryId("");
        setEditProduct(null);
      })
      .catch((error) => console.error("Error updating product", error));
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    axios
      .delete(`https://localhost:7064/api/Product/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => console.error("Error deleting product", error));
  };

  return (
    <div>
      <h1>Products</h1>
      <div>
        <h2>{editProduct ? "Edit Product" : "Create Product"}</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
        {editProduct ? (
          <button onClick={() => handleUpdateProduct(editProduct.id)}>
            Update Product
          </button>
        ) : (
          <button onClick={handleCreateProduct}>Create Product</button>
        )}
      </div>

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Category {product.category}
            <button onClick={() => setEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;