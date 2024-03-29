import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './logo.png';
import { withFirebase } from './components';
import { WeatherPage, AddTimeslipPage, ViewTimeslipsPage, LoginPage, SignUpPage, Error404Page,ForgotPasswordPage } from './pages';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007bff',
    }
  }
})

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
        if (!authUser.emailVerified) {
          authUser.sendEmailVerification(); 
        }
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
      <ThemeProvider theme={theme}>
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
              {(this.state.authUser && !this.state.authUser.emailVerified &&
                <h1>Please verify your email address to access the site</h1>)
                ||
                <Switch>
                  <Route path="/" exact render={ (props) => <ViewTimeslipsPage {...props} firebase={this.props.firebase} authUser={this.state.authUser} /> } />
                  <Route path="/add-timeslip" exact render={ (props) => <AddTimeslipPage {...props} firebase={this.props.firebase} authUser={this.state.authUser} /> } />
                  <Route path="/view-timeslips" exact render={ (props) => <ViewTimeslipsPage {...props} firebase={this.props.firebase} authUser={this.state.authUser} /> } />
                  <Route path="/login" exact render={ (props) => <LoginPage {...props} firebase={this.props.firebase} authUser={this.state.authUser} /> } />
                  <Route path="/forgot-password" exact render={ (props) => <ForgotPasswordPage {...props} firebase={this.props.firebase} /> } />
                  <Route path="/signup" exact render={ (props) => <SignUpPage {...props} firebase={this.props.firebase} authUser={this.state.authUser} /> } />
                  <Route path="/weather" exact component={WeatherPage} />
                  <Route path="/*" component={Error404Page} />
                </Switch>
              }
            </content>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default withFirebase(App);
