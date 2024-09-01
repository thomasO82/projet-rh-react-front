import SubmitButton from "../../components/SubmitButton/SubmitButton";
import FormField from "../../components/FormField/FormField";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setCompany } from '../../feature/companySlice'
import './Login.css'
const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:3009/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email, password: password})
            });
            const data = await response.json();
            if (!response.ok) {
                if (data.error) {
                    return setError(data.error)
                }
                throw new Error("Erreur lors de la connexion");
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
                dispatch(setCompany(data.company));
                navigate('/', {
                    replace: true,
                    state: { user: data.user }
                });
            }else{
                throw new Error("Erreur lors de la connexion");
            }  

        } catch (error) {
            console.error("Erreur d'inscription: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2>Connexion</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="login-form">
                    <FormField
                        label="Email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormField
                        label="Mot de passe"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <SubmitButton isLoading={isLoading} />
                </form>
                <p className="register-link">
                    Pas encore inscris ? <Link to="/register">S'inscrire</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;