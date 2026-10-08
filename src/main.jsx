import { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { LangProvider } from './i18n';
import { ADMIN_PATH } from './lib/supabase';
import './index.css';

// eslint-disable-next-line react-refresh/only-export-components
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

const path = window.location.pathname.replace(/\/+$/, '');
const isAdminRoute = path === ADMIN_PATH || path.startsWith(ADMIN_PATH + '/');

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminRoute ? (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    ) : (
      <LangProvider>
        <App />
      </LangProvider>
    )}
  </StrictMode>
);
