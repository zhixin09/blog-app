import { Route, Routes } from 'react-router-dom';
import PostDetail from './pages/PostDetail/PostDetail';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NotFound from './pages/NotFound/NotFound';
import AuthProvider from './contexts/AuthContext';
import AddEditBlog from './pages/AddEditBlog/AddEditBlog';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route excat path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/create" element={<AddEditBlog />} />
          <Route path="/update/:id" element={<AddEditBlog />} />
          <Route path="/detail/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
