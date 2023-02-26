import { Route, Routes } from 'react-router-dom';
import PostDetail from './pages/PostDetail/PostDetail';
import Home from './pages/Home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </>
  );
}

export default App;
