import React from 'react';

import './Select.css';

const Select = ({ handleChange, options, value}) => (
    <div className="selectWrapper">
        <select onChange={handleChange} value={value}>
            {options.map( ({ value, label }) => 
                <option key={value} value={value}>{label}</option> 
            )}
        </select>
    </div>
)

export default Select;