import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import MenuPublico from './pages/MenuPublico';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AgregarProducto from './pages/AgregarProducto';

import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MenuPublico />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/agregar-producto"
          element={
            <PrivateRoute role="admin">
              <AgregarProducto />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
