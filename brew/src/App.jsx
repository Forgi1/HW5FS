import React from 'react';
import BreweriesList from './BreweriesList.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BreweryDetail from './BreweryDetail';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<BreweriesList />} />
  <Route path="/brewery/:id" element={<BreweryDetail />} />
        </Routes>
    </Router>
  );
}

export default App;
