import React from 'react';
import DashBoardPage from './components/DashBoardPage';
import AdminPage from './components/AdminPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/server" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
