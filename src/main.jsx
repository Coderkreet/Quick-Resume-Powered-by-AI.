import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignInPage from './auth/sign-in/index.jsx';
import Home from './Home/index.jsx';
import Dashboard from './Dashboard/index.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import EditResume from './Dashboard/Resume/[resumeId]/edit/index.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewResume from './my-resume/[resume-id]/ViewResume.jsx';

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const PUBLISHABLE_KEY = 'pk_test_c3RlYWR5LW1vbmtmaXNoLTQyLmNsZXJrLmFjY291bnRzLmRldiQ'

const router = createBrowserRouter([
  {
    element: <App />,
    children:[
      {
        path:"dashboard",
        element: <Dashboard/>
      },{
        path : "/dashboard/resume/:resumeId/edit",
        element:<EditResume/>
      }
    ]
  },
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <ToastContainer position="top-center" />

    <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
