import { Routes, Route } from 'react-router-dom';
import  Home  from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import Login  from './pages/login.jsx';
import Dashboard from '../src/pages/Dash.jsx';
import Nopage from './pages/nopage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dash/:id" element={<Dashboard />} />
        <Route path="*" element={<Nopage/>} />
      </Routes>
    </div>
  );
}

export default App;