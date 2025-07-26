import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HRTest from './components/HRTest';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 font-roboto-condensed">
        <Routes>
          <Route path="/" element={<HRTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;