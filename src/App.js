import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <Route path="/" exact component={HomePage} />
        <Route path="/weather" exact component={WeatherPage} />
        </header>
      </div>
    </Router>
  );
}

export default App;