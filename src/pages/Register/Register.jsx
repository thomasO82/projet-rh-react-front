import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField/FormField';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import './Register.css'

const Register = () => {
    const navigate = useNavigate();

    const [company, setCompany] = useState({
        name: '',
        siret: '',
        email: '',
        name_director: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany(prevCompany => ({
            ...prevCompany,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
            setIsLoading(true);
            try {
                const response = await fetch('http://127.0.0.1:3009/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(company)
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de l'inscription");
                }
                const data = await response.json();
                navigate('/login', {
                    replace: true,
                    state: { user: data.user }
                });

            } catch (error) {
                console.error("Erreur d'inscription: ", error);
            } finally {
                setIsLoading(false);
            }
  
    };

    return (
        <div className="register-container">
            <div className="register-form-container">
                <h2>Inscription de l'entreprise</h2>
                <form onSubmit={handleSubmit} className="register-form">

                    <FormField
                        label="Nom de l'entreprise"
                        type="text"
                        id="name"
                        name="name"
                        value={company.name}
                        onChange={handleChange}
                        required
                        patternError={/^[a-zA-Z0-9\s]{2,50}$/}
                        errorMessage="Le nom de l'entreprise doit contenir entre 2 et 50 caractères alphanumériques."
                    />

                    <FormField
                        label="Numéro SIRET"
                        type="text"
                        id="siret"
                        name="siret"
                        value={company.siret}
                        onChange={handleChange}
                        required
                        patternError={/^[0-9]{14}$/}
                        errorMessage="Le SIRET doit contenir exactement 14 chiffres."

                    />

                    <FormField
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={company.email}
                        onChange={handleChange}
                        required
                        patternError={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                        errorMessage="Veuillez entrer une adresse email valide."
                    />

                    <FormField
                        label="Nom du directeur"
                        type="text"
                        id="name_director"
                        name="name_director"
                        value={company.name_director}
                        onChange={handleChange}
                        required
                        patternError={/^[a-zA-Z\s]{2,50}$/}
                        errorMessage="Le nom du directeur doit contenir entre 2 et 50 caractères alphabétiques."

                    />

                    <FormField
                        label="Mot de passe"
                        type="password"
                        id="password"
                        name="password"
                        value={company.password}
                        onChange={handleChange}
                        required
                        patternError={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}
                        errorMessage="Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre et un chiffre."
                    />

                    <SubmitButton isLoading={isLoading} text="S'inscrire" />
                </form>
                <p className="login-link">
                    Déjà inscrit ? <Link to="/login">Se connecter</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;