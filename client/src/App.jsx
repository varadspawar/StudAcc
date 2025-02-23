import './index.css';
import { Route, Routes } from 'react-router-dom';
import Signup from '../pages/signup';
import Layout from '../pages/layout';  
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  return (
    <div> 
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="signup" element={<Signup/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
