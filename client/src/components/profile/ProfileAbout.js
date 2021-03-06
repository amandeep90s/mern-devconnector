import React from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import { CheckOutlined } from "@ant-design/icons";

const ProfileAbout = ({ profile }) => {
    // get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    // skill set
    const skills = profile.skills.map((skill, index) => (
        <div key={index} className="p-3">
            <CheckOutlined className="text-success me-2" /> {skill}
        </div>
    ));

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">
                        {firstName}&apos;s Bio{" "}
                    </h3>
                    <p className="lead">
                        {isEmpty(profile.bio) ? (
                            <span>{firstName} does not have a bio</span>
                        ) : (
                            <span>{profile.bio}</span>
                        )}
                    </p>
                    <hr />
                    <h3 className="text-center text-info">Skill Set</h3>
                    <div className="row">
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {skills}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
