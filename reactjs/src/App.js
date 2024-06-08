import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { ToastContainer } from 'react-toastify';
import Articles from './Pages/Article';
import AddArticle from './Pages/Article/AddArticle';
import EditArticle from './Pages/Article/EditArticle';


const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/articles" element={<ProtectedRoute element={<Articles />} />} />
        <Route path="/add-article" element={<ProtectedRoute element={<AddArticle />} />} />
        <Route path="/edit-article" element={<ProtectedRoute element={<EditArticle />} />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
