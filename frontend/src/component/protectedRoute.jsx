import { Navigate } from 'react-router-dom';

// Function to check if the user is authenticated
const isAuthenticated = () => {
  // For this example, assuming the token is stored in cookies
  // Alternatively, you can use localStorage.getItem('token') if the token is in localStorage
  return document.cookie.includes('token');
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
