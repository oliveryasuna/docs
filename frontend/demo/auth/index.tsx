// tag::snippet[]
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { AuthProvider } from './auth';

function App() {
    return <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>;
}

createRoot(document.getElementById('outlet')!).render(createElement(App));
// end::snippet[]
