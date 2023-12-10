import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  RedirectToSignUp,
} from '@clerk/clerk-react';

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
                  <HomePage />
                </SignedIn>
                <SignedOut>
                  <LandingPage />
                </SignedOut>
              </>
            }
          />

          <Route
            path='/home'
            element={
              <>
                <SignedIn>
                  <HomePage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route
            path='/login'
            element={
              <>
                <SignedIn>
                  <HomePage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route
            path='/sign-up'
            element={
              <>
                <SignedIn>
                  <HomePage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignUp />
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
