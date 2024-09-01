import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmployeeCard from '../../components/EmployeesCard/EmployeesCard'; 
import './Home.css';

const Home = () => {
  const [company, setCompany] = useState(null);
  const [error, setError] = useState("");
  const employees = useSelector((state) => state.company.employees);
  console.log(employees);
  

  const handleEdit = (employee) => {
    console.log("Modifier", employee);
  };

  const handleDelete = (employeeId) => {
    console.log("Supprimer", employeeId);
  };

  const handleBlame = (employee) => {
    console.log("Blamer", employee);
  };

  return (
    <main className='home-container'>
      <h2>Liste des employés</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="employees-list">
        {employees && employees.length > 0 ? (
          employees.map((employee) => (
            <EmployeeCard
              key={employee._id} // Utilisez _id si c'est l'identifiant unique de MongoDB
              employee={employee}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onBlame={handleBlame} // Ajoutez cette prop
            />
          ))
        ) : (
          <>
            <p>Aucun employé trouvé.</p>
            <Link to="/addemployee">
              <p>Ajouter un employé</p>
            </Link>
          </>
        )}
      </div>
    </main>
  );
};

export default Home;