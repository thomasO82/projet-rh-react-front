import React, { useState, useEffect } from 'react';
import './FormField.css'
const FormField = ({ label, type, id, name, value, onChange, patternError, errorMessage }) => {
    const [error, setError] = useState('');

    const validateField = (fieldValue) => {
        if (patternError && errorMessage) {
            if (!patternError.test(fieldValue)) {
                setError(errorMessage);
            } else {
                setError(null);
            }
        } else {
            setError(null);
        }
    };

    useEffect(() => {
        validateField(value);
    }, [value, patternError, errorMessage]); 

    const handleChange = (e) => {
        onChange(e);
        validateField(e.target.value);
    };

    return (
        <div className="form-group">
            <div className='label-input'>
            {error && <p className="error-message">{error}</p>}
            <label htmlFor={id}>{label}</label>
            </div>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                required
                className={error ? 'input-error' : ''}
            />

        </div>
    );
};

export default FormField;