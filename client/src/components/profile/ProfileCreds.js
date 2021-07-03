import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

const ProfileCreds = ({ education, experience }) => {
    const experienceItems = experience.map((exp) => (
        <li key={exp._id} className="list-group-item p-3">
            <h4>{exp.company}</h4>
            <p>
                {moment(exp.from).format("YYYY/MM/DD")} -{" "}
                {exp.to === null ? " Now" : moment(exp.to).format("YYYY/MM/DD")}
            </p>
            <p>
                <strong>Position:</strong> {exp.title}
            </p>
            <p>
                {exp.location === "" ? null : (
                    <span>
                        <strong>Location: </strong> {exp.location}
                    </span>
                )}
            </p>
            <p>
                {exp.description === "" ? null : (
                    <span>
                        <strong>Description: </strong> {exp.description}
                    </span>
                )}
            </p>
        </li>
    ));

    const educationItems = education.map((edu) => (
        <li key={edu._id} className="list-group-item p-3">
            <h4>{edu.school}</h4>
            <p>
                {moment(edu.from).format("YYYY/MM/DD")} -{" "}
                {edu.to === null ? " Now" : moment(edu.to).format("YYYY/MM/DD")}
            </p>
            <p>
                <strong>Degree:</strong> {edu.degree}
            </p>
            <p>
                <strong>Field Of Study:</strong> {edu.fieldofstudy}
            </p>
            <p>
                {edu.description === "" ? null : (
                    <span>
                        <strong>Description: </strong> {edu.description}
                    </span>
                )}
            </p>
        </li>
    ));

    return (
        <div className="row">
            <div className="col-md-6">
                <h3 className="text-center text-info">Experience</h3>
                {experienceItems.length > 0 ? (
                    <ul className="list-group">{experienceItems}</ul>
                ) : (
                    <p className="text-center">No Experience Listed</p>
                )}
            </div>

            <div className="col-md-6">
                <h3 className="text-center text-info">Education</h3>
                {educationItems.length > 0 ? (
                    <ul className="list-group">{educationItems}</ul>
                ) : (
                    <p className="text-center">No Education Listed</p>
                )}
            </div>
        </div>
    );
};

ProfileCreds.propTypes = {
    education: PropTypes.array.isRequired,
    experience: PropTypes.array.isRequired,
};

export default ProfileCreds;
