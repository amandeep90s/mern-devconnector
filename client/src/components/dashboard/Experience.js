import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Moment from "moment";
import { deleteExperience } from "../../actions/profileActions";
import { DeleteOutlined } from "@ant-design/icons";

const Experience = ({ experience }) => {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteExperience(id));
    };

    const experienceContent = experience.map((value) => (
        <tr key={value._id}>
            <td>{value.company}</td>
            <td>{value.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{value.from}</Moment> -
                {value.to === null ? (
                    " Now"
                ) : (
                    <Moment format="YYYY/MM/DD">{value.to}</Moment>
                )}
            </td>
            <td>
                <button
                    onClick={this.onDeleteClick.bind(this, value._id)}
                    className="d-flex align-items-center btn btn-danger"
                >
                    <DeleteOutlined className="me-2" />
                    Delete
                </button>
            </td>
        </tr>
    ));
    return (
        <>
            <h4 className="mb-3">Experience Credentials</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th>Action</th>
                    </tr>
                    {experienceContent}
                </thead>
            </table>
        </>
    );
};

Experience.propTypes = {
    experience: PropTypes.func.isRequired,
};

export default Experience;
