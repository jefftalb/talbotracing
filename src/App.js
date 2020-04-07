import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './logo.png';
import { HomePage, WeatherPage, AddTimeslip, ViewTimeslips, Error404, withFirebase, Login, SignUp } from './components';

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

  logout = () => {
    this.props.firebase.logout();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar bg="primary" variant="dark" fixed="top">
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
                <Nav.Link as={Link} to="/view-timeslips" href="/view-time-slips">View Time Slips</Nav.Link>
                <Nav.Link as={Link} to="/add-timeslip" href="/add-pass">Add Time Slips</Nav.Link>
                <Nav.Link as={Link} to="/weather" href="/weather">Weather</Nav.Link>
              </Nav>
              <Nav>
              {(this.state.authUser &&
                <Nav.Link onClick={this.logout}>Logout</Nav.Link>) ||
                <Nav.Link as={Link} to="/login" href="/login">Login</Nav.Link>
              }
              </Nav>
            </Navbar>
          </header>
          <content>
            <Switch>
              <Route path="/" exact component={HomePage}/>
              <Route path="/add-timeslip" exact render={ (props) => <AddTimeslip {...props} firebase={this.props.firebase} authUser={this.state.authUser} /> } />
              <Route path="/view-timeslips" exact render={ (props) => <ViewTimeslips {...props} firebase={this.props.firebase} authUser={this.state.authUser} /> } />
              <Route path="/login" exact render={ (props) => <Login {...props} firebase={this.props.firebase} authUser={this.state.authUser} /> } />
              <Route path="/signup" exact render={ (props) => <SignUp {...props} firebase={this.props.firebase} authUser={this.state.authUser} /> } />
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
