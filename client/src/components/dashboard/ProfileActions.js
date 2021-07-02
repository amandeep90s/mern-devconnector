import React from "react";
import { Link } from "react-router-dom";
import {
    UserOutlined,
    BookOutlined,
    UserSwitchOutlined,
} from "@ant-design/icons";

const ProfileActions = () => {
    return (
        <div className="btn-group mb-4" role="group">
            <Link
                to="/edit-profile"
                className="d-flex align-items-center btn btn-primary"
            >
                <UserOutlined className="me-2" /> Edit Profile
            </Link>

            <Link
                to="/add-experience"
                className="d-flex align-items-center btn btn-success"
            >
                <UserSwitchOutlined className="me-2" /> Add Experience
            </Link>

            <Link
                to="/add-education"
                className="d-flex align-items-center btn btn-warning"
            >
                <BookOutlined className="me-2" /> Add Education
            </Link>
        </div>
    );
};

export default ProfileActions;
