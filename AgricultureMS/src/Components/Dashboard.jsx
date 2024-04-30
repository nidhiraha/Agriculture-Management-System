import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import './style.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);

    axios.defaults.withCredentials = true;

    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
            .then(result => {
                if (result.data.Status) {
                    navigate('/adminlogin');
                }
            });
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const handleMenuItemClick = () => {
        setShowSidebar(false);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <button
                        className="btn btn-light"
                        onClick={toggleSidebar}
                        style={{
                            position: 'fixed',
                            top: '10px',
                            left: '10px',
                            zIndex: 1050
                        }}
                    >
                        <i className="bi-list"></i>
                    </button>
                </div>
            </div>
            <div className="row flex-nowrap">
                {showSidebar && (
                    <div className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sidebar ${showSidebar ? '' : 'sidebar-hidden'}`}>
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="w-100">
                                    <Link to="/dashboard" className="nav-link text-white px-0 align-middle" onClick={handleMenuItemClick}>
                                        <i className="fs-4 bi-speedometer2 ms-2"></i>
                                        <span className="ms-2 d-none d-sm-inline"></span>
                                    </Link>
                                </li>
                                <li className="w-100">
                                    <Link to="/dashboard" className="nav-link text-white px-0 align-middle" onClick={handleMenuItemClick}>
                                        <i className="fs-4 bi-speedometer2 ms-2"></i>
                                        <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/income" className="nav-link px-0 align-middle text-white" onClick={handleMenuItemClick}>
                                        <i className="fs-4 bi-currency-dollar ms-2"></i>
                                        <span className="ms-2 d-none d-sm-inline">Income Head</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/expense" className="nav-link px-0 align-middle text-white" onClick={handleMenuItemClick}>
                                        <i className="fs-4 bi-cart-dash ms-2"></i>
                                        <span className="ms-2 d-none d-sm-inline">Expense Head</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/transaction" className="nav-link px-0 align-middle text-white" onClick={handleMenuItemClick}>
                                        <i className="fs-4 bi-bar-chart-line ms-2"></i>
                                        <span className="ms-2 d-none d-sm-inline">Transactions</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/supply_management" className="nav-link px-0 align-middle text-white" onClick={handleMenuItemClick}>
                                        <i className="fs-4 bi-truck ms-2"></i>
                                        <span className="ms-2 d-none d-sm-inline">Supply Management</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/repo" className="nav-link px-0 align-middle text-white" onClick={handleMenuItemClick}>
                                        <i className="fs-4 bi-file-earmark-text ms-2"></i>
                                        <span className="ms-2 d-none d-sm-inline">Reports</span>
                                    </Link>
                                </li>
                                <li onClick={handleLogout}>
                                    <div className="nav-link px-0 align-middle text-white" onClick={handleMenuItemClick}>
                                        <i className="fs-4 bi-power ms-2"></i>
                                        <span className="ms-2 d-none d-sm-inline">Logout</span>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                )}
                <div className={`col p-0 m-0 main-content ${showSidebar ? 'ml-0' : 'ml-250'}`}>
                    <div className="p-2 d-flex justify-content-center">
                        <h4 className="bg-black">Agriculture Expense Management System</h4>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
