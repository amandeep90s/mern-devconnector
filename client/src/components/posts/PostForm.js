import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../actions/postActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

const PostForm = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const {
        auth: { user },
        errors,
    } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            text,
            name: user.name,
            avatar: user.avatar,
        };
        dispatch(addPost(newPost));
        setText("");
    };

    return (
        <div className="mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Say Something...
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <TextAreaFieldGroup
                            placeholder="Create a post"
                            name="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            error={errors.text}
                        />

                        <div className="d-grid mt-4">
                            <button type="submit" className="btn btn-info">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
