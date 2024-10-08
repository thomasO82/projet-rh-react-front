import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCompany } from '../../feature/companySlice';
import './Header.css';

const Header = () => {
  const company = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearCompany());
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          {company ? `Bienvenue, ${company.name}` : 'Mon Application'}
        </h1>
        <nav className="header-nav">
          {localStorage.getItem('token') ? (
            <>
              <Link to="/addemployee" className="header-link">Ajouter un employé</Link>
              <button onClick={handleLogout} className="header-button">Se déconnecter</button>
            </>
          ) : (
            <>
              <Link to="/register" className="header-link">S'inscrire</Link>
              <Link to="/login" className="header-link">Se connecter</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;