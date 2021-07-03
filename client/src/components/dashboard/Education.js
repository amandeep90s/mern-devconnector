import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { deleteEducation } from "../../actions/profileActions";
import { DeleteOutlined } from "@ant-design/icons";

const Education = ({ education }) => {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteEducation(id));
    };

    const educationContent = education.map((value) => (
        <tr key={value._id}>
            <td>{value.school}</td>
            <td>{value.degree}</td>
            <td>{value.fieldOfStudy}</td>
            <td>
                {moment(value.from).format("YYYY/MM/DD")} -
                {value.to === null
                    ? " Now"
                    : moment(value.to).format("YYYY/MM/DD")}
            </td>
            <td>
                <button
                    className="d-flex align-items-center btn btn-danger"
                    onClick={() => handleDelete(value._id)}
                >
                    <DeleteOutlined className="me-2" />
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h4 className="mb-3">Education Credentials</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Field of Study</th>
                        <th>Years</th>
                        <th>Action</th>
                    </tr>
                    {educationContent}
                </thead>
            </table>
        </>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
};

export default Education;
