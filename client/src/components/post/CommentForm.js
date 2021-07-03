import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";

const CommentForm = ({ postId }) => {
    const [text, setText] = useState("");

    const dispatch = useDispatch();
    const {
        auth: { user },
        errors,
    } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            text,
            name: user.name,
            avatar: user.avatar,
        };

        dispatch(addComment(postId, newComment));
        setText("");
    };

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Make a comment...
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <TextAreaFieldGroup
                                placeholder="Reply to post"
                                name="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                error={errors.text}
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-dark">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default CommentForm;
