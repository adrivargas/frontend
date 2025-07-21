import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import MenuPublico from './pages/MenuPublico';
import PrivateRoute from './routes/PrivateRoute';
import Register from './pages/Register';
import AgregarProducto from './pages/AgregarProducto';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuPublico />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute role="admin">
            <AdminDashboard />
            <Route path="/agregar-producto" element={<AgregarProducto />} />
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
    </Routes>
  );
}

export default App;
