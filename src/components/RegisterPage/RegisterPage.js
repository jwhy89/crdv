import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form, Segment, Header, Message,
} from 'semantic-ui-react';
import './RegisterPage.css';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  // Takes arguements of properties for Form.Input component
  renderFormInput = (label, type, name, value) => {
    // if error message exists, renders input with 'error' property
    if (this.props.errors.registrationMessage) {
      return (
        <Form.Input
          error
          label={label}
          type={type}
          name={name}
          value={value}
          placeholder={label}
          onChange={this.handleInputChangeFor(name)}
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
        onChange={this.handleInputChangeFor(name)}
      />
    );
  }

  render() {
    return (
      <div className="RegisterPage-form">

        {this.props.errors.registrationMessage && (
          <Message
            error
            header="Error"
            role="alert"
            content={this.props.errors.registrationMessage}
          />
        )}

        <Segment>
          <Header as="h1">User Registration</Header>
          <Form onSubmit={this.registerUser}>
            {this.renderFormInput('Username', 'text', 'username', this.state.username)}
            {this.renderFormInput('Password', 'password', 'password', this.state.password)}
            <Form.Button
              primary
              fluid
              type="submit"
              name="submit"
            >
              Register
            </Form.Button>
            <Form.Button
              basic
              secondary
              fluid
              size="small"
              type="button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }); }}
            >
              Return to Login Page
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

export default connect(mapStateToProps)(RegisterPage);
