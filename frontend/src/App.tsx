import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const App: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 保護されたリソースへのアクセス
  const handleAccessProtectedResource = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      console.log('Access Token:', accessToken);

      const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Protected resource:', data);

      setMessage(data.message);
      setError(null);
    } catch (error: any) {
      console.error('Error accessing protected resource:', error.message);
      setError('Failed to load protected resource.');
      setMessage(null);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      ) : (
        <div>
          <h2>Welcome, {user?.name}</h2>
          {message && (
            <>
              <h3>Protected Resource Message:</h3>
              <p>{message}</p>
            </>
          )}
          {error && (
            <p>{error}</p>
          )}
          <button onClick={handleAccessProtectedResource}>Access Protected Resource</button>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default App;
