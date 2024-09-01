import React, { useState } from 'react';
import ActionButton from '../ActionButton.jsx/ActionButton';
import { useRemoveEmployeeMutation, useUpdateEmployeeMutation } from '../../services/employeeApi';
import EmployeForm from '../EmployeForm/EmployeForm';
import './EmployeesCard.css';

const EmployeeCard = ({ employee }) => {
    const [removeEmployee, { isLoading: isDeleting }] = useRemoveEmployeeMutation();
    const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
    const [error, setError] = useState()
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleDelete = async () => {
        try {
            await removeEmployee(employee._id).unwrap();
        } catch (error) {
            setError("Erreur lors de la suppression de l'employé")
            
        }
    };

    const handleSubmitEdit = async (employeeData) => {
        try {
            await updateEmployee({
                id: employee._id,
                employe: employeeData
              }
            ).unwrap();
            
            setIsEditMode(false);
        } catch (error) {
            setError("erreur de la modification de l'employer")
        }
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
    };

    if (isEditMode) {
        return (
            <div className="employee-card">
                 {error && (
                
                <p className='error-card'>{error}</p>
            )}
                <EmployeForm 
                    onSubmit={handleSubmitEdit} 
                    initialData={employee}
                    submitButtonLabel="Sauvegarder"
                    currentImg={employee.img}
                />
                <ActionButton 
                    onClick={handleCancelEdit}
                    label="Annuler"
                    type="cancel"
                />
            </div>
        );
    }

    return (
        <div className="employee-card">
            <div>
                <img src={`${import.meta.env.VITE_API_URL}/uploads/${employee.img}`} alt="" />
            </div>
            <h3>{employee.name} {employee.firstname}</h3>
            <p>Poste: {employee.role}</p>
            <p>Nmb blame: {employee.blame}</p>
            <div className="button-container">
                <ActionButton 
                    onClick={handleEdit} 
                    label="Modifier" 
                    type="edit"
                />
                <ActionButton 
                    onClick={handleDelete} 
                    label="Supprimer" 
                    type="delete"
                    disabled={isDeleting || isUpdating}
                />
            </div>
        </div>
    );
};

export default EmployeeCard;