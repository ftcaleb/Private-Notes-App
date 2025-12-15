import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Notepad from './components/NotePad';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/notepad"
          element={
            <div className="flex h-screen">
              <Sidebar />
              <div className='w-100'>
                <Notepad />
                </div>
              
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App
