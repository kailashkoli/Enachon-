import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addProduct, updateProduct } from "../Redux/ProductSlice"; // ✅ Import local actions
import fetchProducts from "../Redux/ProductSlice"; 
const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();  // Get productId from URL params (for editing)

  const { products, status } = useSelector((state) => state.products); // Check if products are loaded

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    rating: "",
    category: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (productId && products.length > 0) {
      const productToEdit = products.find((product) => product.id === parseInt(productId));
      if (productToEdit) {
        setFormData({
          title: productToEdit.title,
          price: productToEdit.price,
          stock: productToEdit.stock,
          rating: productToEdit.rating,
          category: productToEdit.category,
          description: productToEdit.description,
          image: null,
        });
        setPreview(productToEdit.thumbnail); // Set the preview to the current product's image
      }
    }
  }, [productId, products]);  // Re-run if productId or products change

  useEffect(() => {
    // Fetch products if not available yet
    if (status === "idle" && products.length === 0) {
      dispatch(fetchProducts());  // Dispatch fetchProducts action
    }
  }, [dispatch, status, products.length]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      id: productId ? parseInt(productId) : Date.now(), // Use existing product ID if editing
      title: formData.title,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      rating: parseFloat(formData.rating),
      category: formData.category,
      description: formData.description,
      thumbnail: preview || "", // Use preview for image or an empty string
    };

    try {
      if (productId) {
        dispatch(updateProduct(productData));  // Update product if editing
      } else {
        dispatch(addProduct(productData));  // Add new product if creating
      }

      setMessage("✅ Product saved successfully!");
      setFormData({
        title: "",
        price: "",
        stock: "",
        rating: "",
        category: "",
        description: "",
        image: null,
      });
      setPreview(null);
      navigate("/products");  // Redirect to the product list
    } catch (error) {
      setMessage("❌ Failed to save product.");
      console.error(error);
    }
    navigate("/products");  
  };

  if (status === "loading") {
    return <div>Loading...</div>;  // Wait until products are loaded
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{productId ? "Edit Product" : "Add New Product"}</h2>

      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="price" className="form-label">Price ($)</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="rating" className="form-label">Rating (0 - 5)</label>
            <input
              type="number"
              className="form-control"
              id="rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
            <option>Home & Kitchen</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <div className="mb-3">
            <label className="form-label">Image Preview</label>
            <div className="border rounded p-2" style={{ maxWidth: "200px" }}>
              <img src={preview} alt="Preview" className="img-fluid rounded" />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          {productId ? "Save Changes" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Products;
