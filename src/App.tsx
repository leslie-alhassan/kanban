import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<LandingPage />}
        />

        <Route
          path='/home'
          element={<HomePage />}
        />

        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
