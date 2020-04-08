import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
    };
  }

  handleEmail = (e) => {
    this.setState({email: e.target.value});
  }

  handleEmail2 = (e) => {
    this.setState({email2: e.target.value});
  }

  handlePassword = (e) => {
    this.setState({password: e.target.value});
  }

  handlePassword2 = (e) => {
    this.setState({password2: e.target.value});
  }

  onSignUp = async(e) => {
    e.preventDefault();
    if (this.state.email !== this.state.email2) {
      this.setState({error: {code: "email-not-matching", message: "Emails do not match. Please confirm your email before submitting."}});
    }
    else if (this.state.password !== this.state.password2) {
      this.setState({error: {code: "password-not-matching", message: "Passwords do not match. Please confirm your password before submitting."}});
    }
    else {
      var error = await this.props.firebase.createUserWithEmailAndPassword(this.state.email, this.state.password);
      if (error) {
        this.setState({error})
      }
    }
  }

  render() {

    return (
      <Row className="justify-content-md-center">
        <Col xl="3">
        <h1>Sign Up For Free</h1>
        {this.state.error && !this.props.authUser &&
          <Alert variant="danger">
            {this.state.error.message}
          </Alert>
        }
        {(!this.props.authUser &&
          <Form onSubmit={this.onSignUp}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
            <Form.Group controlId="formConfirmBasicEmail">
              <Form.Label>Confirm Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail2} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.handlePassword} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.handlePassword2} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>) ||
          <Alert variant="success">
            You have successfully signed up
          </Alert>
        }
        </Col>
      </Row>
    );
  }
}

export default SignUp;
