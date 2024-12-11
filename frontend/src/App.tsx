import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  // 保護されたリソースへのアクセス
  const handleAccessProtectedResource = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      console.log('Access Token:', accessToken);

      const apiBase = import.meta.env.VITE_APP_API_BASE_URL!;
      const response = await fetch(`${apiBase}/protected`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Protected resource:', data);
    } catch (error) {
      console.error('Error accessing protected resource:', error);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
          <button onClick={handleAccessProtectedResource}>Access Protected Resource</button>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default App;
