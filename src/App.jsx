import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Player from "./pages/Player";
import Flixxit from "./pages/Flixxit";
export default function App(){
  return (
<BrowserRouter>
<Routes>
  <Route exact path="/login" element={<Login/>}/>
  <Route exact path="/signup" element={<SignUp/>}/>
  <Route exact path="/player" element={<Player />} />
  <Route exact path="/"  element={<Flixxit/>}/>
</Routes>
</BrowserRouter>
  );
}

