import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Todos from './pages/Todos';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/app" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1 style={{ padding: 24 }}>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
