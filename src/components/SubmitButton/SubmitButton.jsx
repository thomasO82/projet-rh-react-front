import './SubmitButton.css'

export const SubmitButton = ({ isLoading }) => (
    <button type="submit" className="login-button" disabled={isLoading}>
      {isLoading ? 'Connexion...' : 'Se connecter'}
    </button>
  );
  
export default SubmitButton