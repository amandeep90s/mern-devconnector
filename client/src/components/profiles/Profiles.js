import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

const Profiles = () => {
    const dispatch = useDispatch();
    const {
        profile: { loading, profiles },
    } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        dispatch(getProfiles());
    }, [dispatch]);

    let profileItems;
    if (profiles === null || loading) {
        profileItems = <Spinner />;
    } else if (profiles.length > 0) {
        profileItems = profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
        ));
    } else {
        profileItems = <h4>No profiles found...</h4>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h4 className="text-center">Developer Profiles</h4>
                    <p className="lead text-center">
                        Browse and connect with developers
                    </p>

                    {profileItems}
                </div>
            </div>
        </div>
    );
};

export default Profiles;
