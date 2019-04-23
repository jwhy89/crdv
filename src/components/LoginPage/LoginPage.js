import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Segment } from 'semantic-ui-react';
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="LoginPage-form">
        <Segment>
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}
        </Segment>
        <Form onSubmit={this.login}>
          <h1>Login</h1>
          <Form.Input
            label="Username" type="text"
            name="username" value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />
          <Form.Input
            label="Password" type="password"
            name="password" value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
          <Form.Group>
            <Form.Button
              type="submit"
              name="submit">
              Log in
            </Form.Button>
            <Form.Button
              type="button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}>
              Register
            </Form.Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
