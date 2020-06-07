import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import GoogleSignInNormal from '../images/signin_normal.png';
// import GoogleSignInFocus from '../images/signin_focus.png';
// import GoogleSignInPressed from '../images/signin_pressed.png';

class ForgotPassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: null,
      success: false,
    };
  }

  handleEmail = (e) => {
    this.setState({email: e.target.value});
  }

  onSubmit = async(e) => {
    e.preventDefault();
    console.log("test")
    var error = await this.props.firebase.sendPasswordResetEmail(this.state.email, this.state.password);
    if (error) {
      this.setState({error})
    }
    else {
      this.setState({
        error: null,
        success: true})
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
          <h1>Forgot Password</h1>
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
          {(!this.state.success &&
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Submit
              </Button>
            </Form>) ||
            <Alert variant="success">
              Reset password email has been sent successfully
            </Alert>
          }
          </Col>
      </Row>
    );
  }
}

export default ForgotPassword;
