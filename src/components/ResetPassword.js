import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
// import GoogleSignInNormal from '../images/signin_normal.png';
// import GoogleSignInFocus from '../images/signin_focus.png';
// import GoogleSignInPressed from '../images/signin_pressed.png';

class ResetPassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
    };
  }

  componentWillUnmount() {

  }

  handleEmail = (e) => {
    this.setState({email: e.target.value});
  }

  handlePassword = (e) => {
    this.setState({password: e.target.value});
  }

  onLogin = async(e) => {
    e.preventDefault();
    var error = await this.props.firebase.signInWithEmailAndPassword(this.state.email, this.state.password);
    if (error) {
      this.setState({error})
    }
  }

  // googleSignIn = () => {
  //   var error = this.props.firebase.googleSignInPopup();
  //   if (error) {
  //     this.setState({error})
  //   }
  // }

  // googleHover = () => {
  //   this.setState({googleHover: true});
  // }

  // googleUnhover = () => {
  //   this.setState({googleHover: false, googlePressed: false});
  // }

  // googlePress = () => {
  //   this.setState({googlePressed: true});
  // }

  // googleUnpress = () => {
  //   this.setState({googlePressed: false});
  // }

  render() {

    return (
      <Row className="justify-content-md-center">
        <Col xl="3">
          <h1>Login</h1>
          {/* <img
            src={this.state.googlePressed ? GoogleSignInPressed : this.state.googleHover ? GoogleSignInFocus : GoogleSignInNormal}
            alt="google sign in button"
            onMouseEnter={this.googleHover}
            onMouseLeave={this.googleUnhover}
            onMouseDown={this.googlePress}
            onMouseUp={this.googleUnpress}
            onClick={this.googleSignIn}
          /> */}
          {this.state.error && this.state.error.message &&
            <Alert variant="danger">
              {this.state.error.message}
            </Alert>
          }
          {(!this.props.authUser &&
            <Form onSubmit={this.onLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.handlePassword} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Form.Group>
                <Form.Label>If you do not have an account you can sign up for free <Link to={"/signup"}>here</Link></Form.Label>
              </Form.Group>
            </Form>) ||
            <Alert variant="success">
              You are signed in
            </Alert>
          }
          </Col>
      </Row>
    );
  }
}

export default ResetPassword;
