import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './logo.png';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import AddPass from './pages/AddPass';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/add-pass" href="/add-pass">Add Pass</Nav.Link>
            <Nav.Link as={Link} to="/weather" href="/weather">Weather</Nav.Link>
          </Nav>
        </Navbar>
        </header>
        <content>
          <Route path="/" exact component={HomePage} />
          <Route path="/add-pass" exact component={AddPass} />
          <Route path="/weather" exact component={WeatherPage} />
        </content>
      </div>
    </Router>
  );
}

export default App;
