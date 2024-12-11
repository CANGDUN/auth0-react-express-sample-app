import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.tsx'

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN!;
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID!;
const audience = import.meta.env.VITE_APP_AUTH0_AUDIENCE!;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
        scope: 'openid profile email',
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
