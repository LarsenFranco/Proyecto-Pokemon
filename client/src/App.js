
import React from 'react';
import './App.css';
import Home from './Components/Home';
import { Routes, Route } from "react-router-dom";
import Landing from './Components/Landing';
import PokDetail from './Components/PokDetail.jsx'
import CreatePok from './Components/CreatePok';
import Footer from './Components/Footer'
function App() {
  return (
    <>
      <Routes>
        <Route path="/"       element={<Landing/>} />
        <Route path="/home"         element={<Home/>} />
        <Route path="/pokemon/:id"   element={<PokDetail/>} />
        <Route path="/newpokemon"   element={<CreatePok/>} />
      </Routes>
      {/* <Footer/> */}
    </>
    
  );
}

export default App;
