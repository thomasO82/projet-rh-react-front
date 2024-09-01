import React from 'react';
import './ActionButton.css'; 

const ActionButton = ({ onClick, label, type }) => {
  return (
    <button 
      className={`action-button ${type}`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;