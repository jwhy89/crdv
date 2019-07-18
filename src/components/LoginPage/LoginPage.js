import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form, Segment, Header, Message,
} from 'semantic-ui-react';
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

  handleInputChangeFor = () => (event) => {
    this.setState({
      [event.target.getAttribute('name')]: event.target.value,
    });
  }

  // Takes arguements of properties for Form.Input component
  renderFormInput = (label, type, name, value) => {
    // if error message exists, renders input with 'error' property
    if (this.props.errors.loginMessage) {
      return (
        <Form.Input
          error
          label={label}
          type={type}
          name={name}
          value={value}
          placeholder={label}
          onChange={this.handleInputChangeFor()}
        />
      );
    // else, renders standard input field
    }
    return (
      <Form.Input
        label={label}
        type={type}
        name={name}
        value={value}
        placeholder={label}
        onChange={this.handleInputChangeFor()}
      />
    );
  }

  render() {
    return (
      <div className="LoginPage-form">
        {this.props.errors.loginMessage && (
          <Message
            error
            header="Error"
            role="alert"
            content={this.props.errors.loginMessage}
          />
        )}
        <Segment>
          <Header as="h1">Login</Header>
          <Form onSubmit={this.login}>
            {this.renderFormInput('Username', 'text', 'username', this.state.username)}
            {this.renderFormInput('Password', 'password', 'password', this.state.password)}
            <Form.Button
              primary
              fluid
              type="submit"
              name="submit"
            >
              Log in
            </Form.Button>
            <Form.Button
              type="button"
              basic
              secondary
              fluid
              size="small"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }); }}
            >
              Register
            </Form.Button>
          </Form>
        </Segment>
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
