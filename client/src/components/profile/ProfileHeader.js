import React from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import {
    FacebookFilled,
    GithubFilled,
    TwitterOutlined,
    LinkedinFilled,
    InstagramFilled,
    YoutubeFilled,
} from "@ant-design/icons";

const ProfileHeader = ({ profile }) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-info text-white mb-3">
                    <div className="d-flex justify-content-center">
                        <div className="col-4 col-md-3">
                            <img
                                src={profile?.user.avatar}
                                alt="Profile Avatar"
                                className="rounded-circle"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="display-4">{profile.user.name}</h1>
                        <p className="lead">
                            {profile.status} {"  "}
                            {!isEmpty(profile.company) && (
                                <span>at {profile.company}</span>
                            )}
                        </p>
                        {!isEmpty(profile.location) && (
                            <p>{profile.location}</p>
                        )}
                        <p>
                            {!isEmpty(profile.website) && (
                                <a
                                    className="text-white p-2"
                                    href={profile.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Website"
                                >
                                    <GithubFilled />
                                </a>
                            )}

                            {!isEmpty(
                                profile.social && profile.social.twitter
                            ) && (
                                <a
                                    className="text-white p-2"
                                    href={profile.social.twitter}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Twitter"
                                >
                                    <TwitterOutlined />
                                </a>
                            )}

                            {!isEmpty(
                                profile.social && profile.social.facebook
                            ) && (
                                <a
                                    className="text-white p-2"
                                    href={profile.social.facebook}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Facebook"
                                >
                                    <FacebookFilled />
                                </a>
                            )}

                            {!isEmpty(
                                profile.social && profile.social.linkedin
                            ) && (
                                <a
                                    className="text-white p-2"
                                    href={profile.social.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="LinkedIn"
                                >
                                    <LinkedinFilled />
                                </a>
                            )}

                            {!isEmpty(
                                profile.social && profile.social.youtube
                            ) && (
                                <a
                                    className="text-white p-2"
                                    href={profile.social.youtube}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Youtube"
                                >
                                    <YoutubeFilled />
                                </a>
                            )}

                            {!isEmpty(
                                profile.social && profile.social.instagram
                            ) && (
                                <a
                                    className="text-white p-2"
                                    href={profile.social.instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Instagram"
                                >
                                    <InstagramFilled />
                                </a>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileHeader.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileHeader;
