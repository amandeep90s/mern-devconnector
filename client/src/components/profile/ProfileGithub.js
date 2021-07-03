import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const initialState = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_SECRET_ID,
    count: 5,
    sort: "created: asc",
    repositories: [],
};

const ProfileGithub = ({ username }) => {
    const [state, setState] = useState(initialState);
    const myRef = useRef(null);

    useEffect(() => {
        fetch(
            `https://api.github.com/users/${username}/repos?per_page=${state.count}&sort=${state.sort}&client_id=${state.clientId}&client_secret=${state.clientSecret}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (myRef) {
                    setState({ ...state, repositories: data });
                }
            })
            .catch((err) => console.log(err));
    });

    const repoItems = state.repositories.map((repo) => (
        <div key={repo.id} className="card card-body mb-2">
            <div className="row d-flex align-items-center">
                <div className="col-md-6">
                    <h4>
                        <a
                            href={repo.html_url}
                            className="text-info"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {repo.name}
                        </a>
                    </h4>
                    <p className="m-0">{repo.description}</p>
                </div>
                <div className="col-md-6">
                    <span className="badge bg-info me-2">
                        Stars: {repo.stargazers_count}
                    </span>
                    <span className="badge bg-secondary me-2">
                        Watchers: {repo.watchers_count}
                    </span>
                    <span className="badge bg-success">
                        Forks: {repo.forks_count}
                    </span>
                </div>
            </div>
        </div>
    ));

    return (
        <div ref={myRef}>
            <hr />
            <h3 className="mb-4">Latest Github Repositories</h3>
            {repoItems}
        </div>
    );
};

ProfileGithub.propTypes = {
    username: PropTypes.string,
};

export default ProfileGithub;
