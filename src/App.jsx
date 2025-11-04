import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SplashScreen from './pages/SplashScreen';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/Layout';
import ListaFilm from './pages/ListaFilm';
import ListaTodos from './pages/ListaTodos';
import Profilo from './pages/Profilo';
import Preferiti from './pages/Preferiti';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="films" element={<ListaFilm />} />
          <Route path="todos" element={<ListaTodos />} />
          <Route path="profilo" element={<Profilo />} />
          <Route path="preferiti" element={<Preferiti />} />
          <Route path="*" element={<Navigate to="/app/films" replace />} />
        </Route>
        <Route path="*" element={<h1 style={{ padding: 24, color: '#fff' }}>404 - Pagina non trovata</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
