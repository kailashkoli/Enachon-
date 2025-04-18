import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { products, status, error } = useSelector((state) => state.products);

  const totalProducts = products.length;

  return (
    <div className="container mt-4">
      {/* Welcome Message */}
      <div className="mb-4 p-4 bg-light rounded shadow-sm">
        <h2 className="fw-bold">Welcome back, Admin 👋</h2>
        <p className="text-muted">Here's what's happening in your store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow text-white bg-primary">
            <div className="card-body">
              <h5>Total Products</h5>
              <h3>{totalProducts}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow text-white bg-success">
            <div className="card-body">
              <h5>Categories</h5>
              <h3>10</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow text-white bg-warning">
            <div className="card-body">
              <h5>Orders</h5>
              <h3>320</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow text-white bg-danger">
            <div className="card-body">
              <h5>Customers</h5>
              <h3>75</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Order Fulfillment</h5>
              <div className="progress">
                <div className="progress-bar bg-success" style={{ width: "80%" }}>80%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Customer Satisfaction</h5>
              <div className="progress">
                <div className="progress-bar bg-info" style={{ width: "92%" }}>92%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="card shadow-sm mb-5">
        <div className="card-header bg-white">
          <h5 className="mb-0">Recent Orders</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1001</td>
                <td>Jane Doe</td>
                <td>Wireless Mouse</td>
                <td><span className="badge bg-success">Delivered</span></td>
                <td>Apr 15, 2025</td>
              </tr>
              <tr>
                <td>1002</td>
                <td>John Smith</td>
                <td>Bluetooth Speaker</td>
                <td><span className="badge bg-warning">Pending</span></td>
                <td>Apr 16, 2025</td>
              </tr>
              <tr>
                <td>1003</td>
                <td>Emily Clark</td>
                <td>Smart Watch</td>
                <td><span className="badge bg-danger">Cancelled</span></td>
                <td>Apr 17, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
