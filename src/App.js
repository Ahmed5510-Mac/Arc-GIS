
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import {
  BrowserRouter,
  Routes,
  Navigate,
  Route
} from "react-router-dom";

import Registretion from './Component/registeration'
import Map from './Component/Map'
import Login from './Component/login';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registretion />} />
      <Route path="map" element={<Map />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
