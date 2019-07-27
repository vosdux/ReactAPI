import React from 'react';

import './NewsPost.css'

const NewsPost = ({ author, created_at, num_comments, title, points, url }) => (
    <li className="news">
        <div className="description">
            <a href={url} className="newsTitle">{title}</a>
            <span className="text">{`${points} points`}</span>
            <span className="comments">{`${num_comments} comments`}</span>
            <span className="date">{new Date(created_at).toLocaleDateString()}</span>
            <span className="author">{author}</span>
        </div>
    </li>
);

export default NewsPost;