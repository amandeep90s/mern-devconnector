import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deletePost, removeLike } from "../../actions/postActions";
import {
    LikeOutlined,
    LikeFilled,
    DislikeOutlined,
    DislikeFilled,
    DeleteOutlined,
    CommentOutlined,
} from "@ant-design/icons";

const PostItem = ({ post }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({ ...state }));

    const handleDelete = (id) => {
        dispatch(deletePost(id));
    };

    const handleLike = (id) => {
        dispatch(addLike(id));
    };

    const handleRemoveLike = (id) => {
        dispatch(removeLike(id));
    };

    const findUserLike = (likes) => {
        if (likes.filter((like) => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <img
                        className="rounded-circle d-md-block"
                        src={post.avatar}
                        alt=""
                    />
                    <br />
                    <p className="text-center">{post.name}</p>
                </div>

                <div className="col-md-10">
                    <p className="lead">{post.text}</p>
                    <div className="d-flex justify-content-start">
                        <button
                            type="button"
                            onClick={() => handleLike(post._id)}
                            className="btn btn-success d-flex  align-items-center me-2"
                            title="Like Post"
                        >
                            {findUserLike(post.likes) ? (
                                <LikeFilled className="text-white me-2" />
                            ) : (
                                <LikeOutlined className="text-white me-2" />
                            )}{" "}
                            Like
                            <span className="badge bg-white text-dark ms-2">
                                {post.likes.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleRemoveLike(post._id)}
                            className="btn btn-dark d-flex align-items-center me-2"
                            title="Unlike Post"
                        >
                            {findUserLike(post.likes) ? (
                                <DislikeOutlined className="text-white me-2" />
                            ) : (
                                <DislikeFilled className="text-white me-2" />
                            )}{" "}
                            Unlike
                        </button>

                        <Link
                            to={`/post/${post._id}`}
                            className="btn btn-info d-flex align-items-center me-2"
                        >
                            <CommentOutlined className="me-2" />
                            Comments
                        </Link>

                        {post.user === auth.user.id && (
                            <button
                                type="button"
                                className="btn btn-danger d-flex align-items-center"
                                onClick={() => handleDelete(post._id)}
                            >
                                <DeleteOutlined className="me-2" /> Delete Post
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostItem;
