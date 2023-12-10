import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import LandingPage from './pages/LandingPage/LandingPage';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SelectOrganizationPage from './pages/OrganizationsPage/OrganizationsPage';
import Dashboard from './pages/Dashboard/Dashboard';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Publishable Key');
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <SignedIn>
                  <SelectOrganizationPage />
                </SignedIn>
                <SignedOut>
                  <LandingPage />
                </SignedOut>
              </>
            }
          />

          <Route
            path='/login'
            element={
              <>
                <SignedIn>
                  <SelectOrganizationPage />
                </SignedIn>
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              </>
            }
          />

          <Route
            path='/sign-up'
            element={
              <>
                <SignedIn>
                  <SelectOrganizationPage />
                </SignedIn>
                <SignedOut>
                  <SignUpPage />
                </SignedOut>
              </>
            }
          />

          <Route
            path='/organizations'
            element={
              <>
                <SignedIn>
                  <SelectOrganizationPage />
                </SignedIn>
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              </>
            }
          />

          <Route
            path='/organization/:id'
            element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              </>
            }
          />

          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
