// components/EmployeeForm/EmployeeForm.js
import React, { useState } from 'react';
import FormField from '../FormField/FormField';
import InputFile from '../InputFile/InputFile';
import SubmitButton from '../SubmitButton/SubmitButton';
import './EmployeForm.css';

const EmployeeForm = ({ onSubmit, initialData = {}, submitButtonLabel = "Ajouter",currentImg = null, error="" }) => {
  const [name, setName] = useState(initialData.name || '');
  const [firstname, setFirstname] = useState(initialData.firstname || '');
  const [role, setRole] = useState(initialData.role || '');
  const [img, setImg] = useState(currentImg);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && firstname && role) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('firstname', firstname);
      formData.append('role', role);
      if (img && img[0]) {
        formData.append('img', img[0]);
      }
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
        {error && (
        <p>{error}</p>
      )}
      <InputFile
        label="Image"
        currentImg = {currentImg}
        id="img"
        name="img"
        onChange={(files) => setImg(files)}
      />
      <FormField
        label="Nom"
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        patternError={/^[a-zA-Z\s]{2,50}$/}
        errorMessage="Le nom doit contenir entre 2 et 50 caractères alphabétiques."
      />
      <FormField
        label="Prénom"
        type="text"
        id="firstname"
        name="firstname"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        patternError={/^[a-zA-Z\s]{2,50}$/}
        errorMessage="Le prénom doit contenir entre 2 et 50 caractères alphabétiques."
      />
      <FormField
        label="Rôle"
        type="text"
        id="role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        patternError={/^[a-zA-Z\s]{2,50}$/}
        errorMessage="Le rôle doit contenir entre 2 et 50 caractères alphabétiques."
      />
      <SubmitButton label={submitButtonLabel} />
    </form>
  );
};

export default EmployeeForm;