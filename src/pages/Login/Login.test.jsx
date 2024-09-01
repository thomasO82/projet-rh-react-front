import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from './Login';

// Mock de Redux
const mockStore = configureStore([]);

// Mock de react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe('LoginPage', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        global.fetch = vi.fn();
    });


    //Premier test, on s'attend, quand on rend la vue ci dessous qu'on a bien sur l'ecran le lable Email, Mot de passe, etc...
    it('renders login form', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument();
    });


    //deuxieme test pour la soumission avec succes du formulaire
    it('handles form submission', async () => {

        //ici, on mock la reponse du serveur, on veux que le status soit ok, et qu'on ai bien un token
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ token: 'fake-token', company: { name: 'Test Company' } }),
        });

        //on rend notre composant
        render(
            <Provider store={store}>
                <BrowserRouter>
                <Login />               
                 </BrowserRouter>
            </Provider>
        );
        // ici, on entre les donné dans le formulaire grace a la bibliotheque fireEvent qui permet de simuler des evenement, on utilise change pour simuler le onchange
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'password123' } });
        // et on click
        fireEvent.click(screen.getByRole('button', { name: /Se connecter/i }));

        //on attend l'appel a notre fonction mock fetch
        await waitFor(() => {
            //ici, notre test doit avoir appeller notre mock de fetch (avec la route de login) et attend qu'on objet soit recu
            expect(global.fetch).toHaveBeenCalledWith('http://146.59.242.125:3010/login', expect.any(Object));
        });

        //ici on appelle getAction de notre mock de redux, qui permet de recuperer ce qui a ete fait sur le "faux" store
        const actions = store.getActions();
        //et on verifie que tout soit ok ^^
        console.log(actions);
        
        expect(actions).toEqual([
            {
                type: 'company/setCompany',
                payload: {
                    name: 'Test Company',
                }
            }
        ]);
    });

    //test pour verifier le fail du login
    it('displays error message on failed login', async () => {
        // pareil, on simule un retour de notre fetch, echoué cette fois
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({ error: 'Invalid credentials' }),
        });
        // on rend notre composant
        render(
            <Provider store={store}>
                <BrowserRouter>
                <Login />               
                 </BrowserRouter>
            </Provider>
        );
        // on set les valeur a notre form
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Se connecter/i }));
        //on attend que l'appel se termine
        await waitFor(() => {
            //et on ckeck l'erreur !
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
});