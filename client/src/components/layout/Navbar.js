import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

const Navbar = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({ ...state }));

    const { isAuthenticated, user } = auth;

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(clearCurrentProfile());
        dispatch(logoutUser());
    };

    const authLinks = (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link" to="/feed">
                    Post Feed
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                    Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <a href="/#" onClick={handleLogout} className="nav-link">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="rounded-circle"
                        style={{ width: "2rem", marginRight: "0.5rem" }}
                        title="You must have a Gravatar connected to your email to display an image"
                    />{" "}
                    Logout
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link" to="/register">
                    Register
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    DevConnector
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mobile-nav"
                    aria-controls="mobile-nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profiles">
                                {" "}
                                Developers
                            </Link>
                        </li>
                    </ul>

                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
