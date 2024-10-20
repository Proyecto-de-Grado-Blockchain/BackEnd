import './App.css';
import { Login } from './componentes/Login';
import { Home } from './componentes/Home';
import {CasosActivos} from './componentes/CasosActivos'; 
import {CasosCerrados} from './componentes/CasosCerrados'; 
import {Ayuda} from './componentes/Ayuda'; 
import {DetalleCasos} from './componentes/DetalleCasos'; 
import {DetalleCasosCerrados} from './componentes/DetalleCasosCerrados'
import {DocumentosExistentes} from './componentes/DocumentosExistentes'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CrearCaso } from './componentes/CrearCaso';
import { AgregarDocumentos } from './componentes/AgregarDocumentos';
import { CrearUsuario } from './componentes/CrearUsuario'
import { GestionCaso } from './componentes/GestionCaso'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/casos-activos" element={<CasosActivos/>} />
            <Route path="/casos-cerrados" element={<CasosCerrados/>} />
            <Route path="/centro-ayuda" element={<Ayuda/>} />
            <Route path="/detalle-casos" element={<DetalleCasos/>} />
            <Route path="/Documentos-existentes" element={<DocumentosExistentes/>} />
            <Route path="/detalle-casosCerrados" element={<DetalleCasosCerrados/>} />
            <Route path="/crear-caso" element={<CrearCaso/>} />
            <Route path="/agregar-documentos" element={<AgregarDocumentos/>} />
            <Route path="/crear-usuario" element={<CrearUsuario/>} />
            <Route path="/gestion-caso" element={<GestionCaso/>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
