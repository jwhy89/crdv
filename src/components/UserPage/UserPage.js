import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Header } from 'semantic-ui-react';
import './UserPage.css';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = props => (
  <div className="UserPage-div">
    <Segment>
      <Header as="h1">
        Welcome,
        {' '}
        {props.user.username}
!
      </Header>
      <p>
Your ID is:
        {props.user.id}
      </p>

      <Form>

        <Form.Button
          primary
          onClick={() => { props.history.push('/selection'); }}
        >
          Selection Page
        </Form.Button>
        <Form.Button
          negative
          basic
          onClick={() => props.dispatch({ type: 'LOGOUT' })}
        >
          Log Out
        </Form.Button>

      </Form>
    </Segment>
  </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
