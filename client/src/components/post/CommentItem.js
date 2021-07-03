import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";
import { DeleteOutlined } from "@ant-design/icons";

const CommentItem = ({ comment, postId }) => {
    const dispatch = useDispatch();
    const {
        auth: { user },
    } = useSelector((state) => ({ ...state }));

    const handleDelete = (postId, commentId) => {
        dispatch(deleteComment(postId, commentId));
    };

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <img
                        src={user.avatar}
                        alt="Profile avatar"
                        className="rounded-circle d-md-block"
                    />
                    <br />
                    <p className="text-center">{comment.name}</p>
                </div>

                <div className="col-md-10">
                    <p className="lead">{comment.text}</p>
                    {comment.user === user.id && (
                        <button
                            type="button"
                            onClick={() => handleDelete(postId, comment._id)}
                            className="btn btn-danger d-flex align-items-center"
                        >
                            <DeleteOutlined className="me-2" />
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
};

export default CommentItem;
