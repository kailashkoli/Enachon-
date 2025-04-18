import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Component/Navbar";
import Products from "./Component/Products";
import Dashboard from "./Component/Dashboard";
import Category from "./Component/Category";
import ProductList from "./Component/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<Products />} /> {/* Edit product route with dynamic productId */}
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Category />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
