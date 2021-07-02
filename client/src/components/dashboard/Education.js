import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Moment from "moment";
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
            <td>
                <Moment format="YYYY/MM/DD">{value.from}</Moment> -
                {value.to === null ? (
                    " Now"
                ) : (
                    <Moment format="YYYY/MM/DD">{value.to}</Moment>
                )}
            </td>
            <td>
                <button className="d-flex align-items-center btn btn-danger">
                    <DeleteOutlined
                        className="me-2"
                        onClick={() => handleDelete(value._id)}
                    />
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
    education: PropTypes.func.isRequired,
};

export default Education;
