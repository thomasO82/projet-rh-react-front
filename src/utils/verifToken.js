 const verifyToken = async () => {
    const token = localStorage.getItem('token');
    console.log('takjhkj');
    
    if (!token) {
      return false;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}verifytoken`, {
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