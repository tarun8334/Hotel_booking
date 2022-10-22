import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Booking from "./components/booking";
import Hotel from "./components/hotel";
import Login from "./components/Login";
import Map from "./components/map";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/map" element={<Map />} />
        <Route path="/booking" element={<Booking />} />
        
        {/* <Route path="booking" element={<Booking />} />
        <Route path="map" element={<Map />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
