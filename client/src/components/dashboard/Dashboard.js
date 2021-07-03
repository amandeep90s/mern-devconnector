import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { DeleteOutlined } from "@ant-design/icons";

const Dashboard = () => {
    const {
        profile: { profile, loading },
        auth: { user },
    } = useSelector((state) => ({ ...state }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [dispatch]);

    const handleDelete = () => {
        dispatch(deleteAccount());
    };

    let dashboardContent;

    if (profile === null || loading) {
        dashboardContent = <Spinner />;
    } else if (Object.keys(profile).length > 0) {
        // check if logged in user has profile data
        dashboardContent = (
            <>
                <p className="lead text-muted">
                    Welcome{" "}
                    <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                </p>
                <ProfileActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />

                <div className="mt-4">
                    <button
                        onClick={handleDelete}
                        className="d-flex align-items-center btn btn-danger text-capitalize"
                    >
                        <DeleteOutlined className="me-2" />
                        Delete my account
                    </button>
                </div>
            </>
        );
    } else {
        // user is logged in but has no profile
        dashboardContent = (
            <>
                <p className="lead text-muted">Welcome {user.name}</p>
                <p>
                    You have not yet setup a profile, please add some
                    information
                </p>
                <Link to="/create-profile" className="btn btn-info">
                    Create Profile
                </Link>
            </>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h4>Dashboard</h4>
                    {dashboardContent}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
