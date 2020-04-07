import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './logo.png';
import { HomePage, WeatherPage, AddTimeSlip, ViewTimeSlips, Error404, withFirebase } from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }
  
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({ authUser });
      }
      else {
        this.setState({ authUser: null });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
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
                <Nav.Link as={Link} to="/view-time-slips" href="/view-time-slips">View Time Slips</Nav.Link>
                <Nav.Link as={Link} to="/add-time-slip" href="/add-pass">Add Time Slips</Nav.Link>
                <Nav.Link as={Link} to="/weather" href="/weather">Weather</Nav.Link>
              </Nav>
            </Navbar>
          </header>
          <content>
            <Switch>
              <Route path="/" exact component={HomePage}/>
              <Route path="/add-time-slip" exact render={ (props) => <AddTimeSlip {...props} firebase={this.props.firebase} /> } />
              <Route path="/view-time-slips" exact render={ (props) => <ViewTimeSlips {...props} firebase={this.props.firebase} /> } />
              <Route path="/weather" exact component={WeatherPage} />
              <Route path="/*" component={Error404} />
            </Switch>
          </content>
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
