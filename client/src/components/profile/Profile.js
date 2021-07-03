import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";

const Profile = ({ history, match }) => {
    const dispatch = useDispatch();
    const {
        profile: { profile, loading },
    } = useSelector((state) => ({ ...state }));

    const { handle } = match.params;

    useEffect(() => {
        if (handle) {
            dispatch(getProfileByHandle(handle, history));
        }
    }, [dispatch, handle, history]);

    let profileContent;

    if (profile === false || loading) {
        profileContent = <Spinner />;
    } else {
        profileContent = (
            <>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/profiles" className="btn btn-primary mb-3">
                            Back To Profiles
                        </Link>
                    </div>
                </div>
                <ProfileHeader profile={profile} />
                <ProfileAbout profile={profile} />
                <ProfileCreds
                    education={profile.education}
                    experience={profile.experience}
                />
                {profile.githubUsername && (
                    <ProfileGithub username={profile.githubUsername} />
                )}
            </>
        );
    }

    return (
        <div className="row">
            <div className="col-md-12">{profileContent}</div>
        </div>
    );
};

export default Profile;
