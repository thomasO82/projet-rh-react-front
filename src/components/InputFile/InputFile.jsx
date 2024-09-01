import React, { useState, useEffect } from 'react';
import './InputFile.css'; 

const InputFile = ({ label, id, name, onChange, currentImg }) => {
    const [preview, setPreview] = useState(null); 

    const handleChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); 
            };
            reader.readAsDataURL(file); 
            onChange(e.target.files); 
        } else {
            setPreview(null);
            onChange(null); 
        }
    };

    return (
        <div className="file-input-group">
              {preview && (
                <img src={preview} alt="Aperçu" className="image-preview" />
            )}
            {currentImg && !preview && (
                <img src={`http://localhost:3009/uploads/${currentImg}`} alt="Aperçu" className="image-preview" />
            )}
            <label htmlFor={id}>{label}</label>
            <input
                type="file"
                id={id}
                name={name}
                onChange={handleChange}
                accept="image/*" 
            />
          
        </div>
    );
};

export default InputFile;