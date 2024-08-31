 const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthState({ isAuthenticated: false, isLoading: false });
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:3009/verifytoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(response);
      if (!response.ok) {
        throw new Error('Le Token est mort, vive le token');
      }
      localStorage.setItem('token', data.token);
      return true
    } catch (error) {
      console.error('Erreur de verification du token:', error);
      return false
    }
  };

  export default verifyToken