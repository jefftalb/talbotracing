import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

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

  handlePassword = (e) => {
    this.setState({password: e.target.value});
  }

  onLogin = async(e) => {
    e.preventDefault();
    var error = await this.props.firebase.createUserWithEmailAndPassword(this.state.email, this.state.password);
    console.log(error);
    if (error) {
      this.setState({error})
    }
  }

  render() {

    return (
      <>
        <h1>Sign Up For Free</h1>
        {this.state.error && !this.props.authUser &&
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
          </Form>) ||
          <Alert variant="success">
            You have successfully signed up
          </Alert>
        }
      </>
    );
  }
}

export default SignUp;
