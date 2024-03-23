import React from 'react';
import Login from './components/Login';
import Register from "./components/Signup";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          {/* <Route path="/task" element={<Task/>} /> */}
        </Routes>
  );
}

export default App;
