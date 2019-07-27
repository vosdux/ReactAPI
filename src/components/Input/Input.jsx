import React from 'react';

import './Input.css';

const Input = ({ onChange, value, onKeyPress }) => (
    <div className="inputWrapper">
        <i className="fas fa-search" />
        <input
            className="input"
            placeholder="Click to search"
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={value}
        />
    </div>
);

export default Input;