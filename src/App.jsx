import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SplashScreen from './pages/SplashScreen';
import HomeWrapper from './components/HomeWrapper';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/Layout';

import ListaTodos from './pages/ListaTodos';
import Profilo from './pages/Profilo';
import Preferiti from './pages/Preferiti';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeWrapper />}>
          
          <Route
            path="todos"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ListaTodos />} />
          </Route>
          <Route
            path="profilo"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profilo />} />
          </Route>
          <Route
            path="preferiti"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Preferiti />} />
          </Route>
        </Route>
        <Route path="*" element={<h1 style={{ padding: 24, color: '#fff' }}>404 - Pagina non trovata</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
