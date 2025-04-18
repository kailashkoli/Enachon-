// ProductList Component
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../Redux/ProductSlice";  // Import the deleteProduct action
import { fetchProducts } from "../Redux/ProductSlice";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, status, error } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (!storedProducts && status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    let updated = [...products];
    if (searchQuery) {
      updated = updated.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortOption) {
      updated.sort((a, b) => {
        switch (sortOption) {
          case "price-asc": return a.price - b.price;
          case "price-desc": return b.price - a.price;
          case "rating-asc": return a.rating - b.rating;
          case "rating-desc": return b.rating - a.rating;
          case "title-asc": return a.title.localeCompare(b.title);
          case "title-desc": return b.title.localeCompare(a.title);
          default: return 0;
        }
      });
    }
    setFilteredProducts(updated);
    setCurrentPage(1);
  }, [products, searchQuery, sortOption]);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId)); // Dispatch deleteProduct action
  };

  const handleEdit = (productId) => {
    console.log("product.id", productId)
    navigate(`/products/${productId}`); // Navigate to edit product page with productId
  };

  const getStockBadge = (stock) => {
    if (stock > 20) return <span className="badge bg-success">In Stock</span>;
    if (stock > 0) return <span className="badge bg-warning text-dark">Low Stock</span>;
    return <span className="badge bg-danger">Out of Stock</span>;
  };

  return (
    <div className="container mt-5">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h4 className="mb-0 fw-semibold">Product List</h4>
          <button className="btn btn-primary" onClick={() => navigate("/products")}>
            Add Product
          </button>
        </div>
        <div className="card-body">
          <div className="d-flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Search by title..."
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="form-select w-auto"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-asc">Rating: Low to High</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="title-asc">Title: A to Z</option>
              <option value="title-desc">Title: Z to A</option>
            </select>
          </div>

          {status === "loading" && <p>Loading products...</p>}
          {status === "failed" && <p className="text-danger">Error: {error}</p>}

          {status === "succeeded" && (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price ($)</th>
                      <th>Stock</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.length > 0 ? (
                      paginatedProducts.map((product, index) => (
                        <tr key={product.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              width="50"
                              height="50"
                              className="rounded"
                              style={{ objectFit: "cover" }}
                            />
                          </td>
                          <td>{product.title}</td>
                          <td>{product.category}</td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>{getStockBadge(product.stock)}</td>
                          <td>{product.rating} ⭐</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => handleEdit(product.id)}  // Edit button action
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm ml-2"
                              onClick={() => handleDelete(product.id)} // Delete button action
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {pageCount > 1 && (
                <nav className="mt-3">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                    </li>
                    {Array.from({ length: pageCount }, (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === pageCount ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pageCount}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
