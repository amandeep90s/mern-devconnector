import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Landing = ({ history }) => {
    const { auth } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (auth.isAuthenticated) history.push("/dashboard");
    }, [auth, history]);

    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-4 mb-4">
                                Developer Connector
                            </h1>
                            <p className="lead">
                                Create a developer profile/portfolio, share
                                posts and get help from other developers
                            </p>
                            <hr />
                            <Link to="/register" className="btn btn-info me-2">
                                Register
                            </Link>
                            <Link to="/login" className="btn btn-light">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
