import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import Proof from './pages/Proof';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/proof" element={<Proof />} />
          <Route path="/rb/proof" element={<Proof />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
