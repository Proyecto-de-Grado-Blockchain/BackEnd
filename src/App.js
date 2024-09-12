import './App.css';
import { Login } from './componentes/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home} from './componentes/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;