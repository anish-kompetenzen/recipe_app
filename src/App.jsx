import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import Favourites from './components/Favourites';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/l' element={<Login />} />
        <Route path='/d' element={<Dashboard />} />
        <Route path='/m' element={<Menu />} />
        <Route path='/f' element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
