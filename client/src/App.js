import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import BehaviorDetailsPage from './pages/BehaviorDetails';
import Navbar from './components/Navbar';
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/behavior/:id" element={<BehaviorDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;