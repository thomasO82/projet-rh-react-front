import React, { useState } from 'react';
import { useAddEmployeeMutation } from '../../services/employeeApi';
import EmployeeForm from '../../components/EmployeForm/EmployeForm';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  const [error, setError] = useState('')

  const handleSubmit = async (formData) => {
    try {
      await addEmployee(formData).unwrap();
      navigate('/');
    } catch (error) {
      setError("Erreur lors de l'ajout de l'employé :")
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Ajouter un nouvel employé</h2>
    
      <EmployeeForm onSubmit={handleSubmit} submitButtonLabel="Ajouter" error={error} />
    </div>
  );
};

export default AddEmployee;