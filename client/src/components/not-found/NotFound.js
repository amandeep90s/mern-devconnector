import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="text-center">
            <h1 className="display-4">Page Not Found</h1>
            <p>
                Sorry, this page does not exist,{" "}
                <Link to="/dashboard">Go Back</Link>
            </p>
        </div>
    );
};

export default NotFound;
