import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();
    const handleDashbord = () => {
      navigate("/dashboard");
    }
     const handleProducts = () => {
        navigate("/productlist");
     }
    const handleCategory = () => {
        navigate("/categories");
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">My-App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" onClick={handleDashbord}>
              <a className="nav-link" aria-current="page" href="#">Dashboard</a>
            </li>
            <li className="nav-item" onClick={handleProducts}>
              <a className="nav-link" href="#">Products</a>
            </li>
            <li className="nav-item" onClick={handleCategory}>
              <a className="nav-link" href="#">Categories</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Orders</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Customers</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;