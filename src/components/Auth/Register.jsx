import React, { Component } from 'react';
import {
  Button,
  Header,
  Icon,
  Grid,
  Form,
  Segment,
  Message
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../utils/firebase';
import validateUser from '../../utils/validateUser';
import gravatar from 'gravatar';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errorMessage: null,
    loading: null
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormValid = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const result = validateUser({ username, email, password });
    if (result.error) {
      this.setState({ errorMessage: result.error.details[0].message });
      return false;
    } else {
      if (password !== passwordConfirmation) {
        this.setState({ errorMessage: 'password do not match' });
        return false;
      }
      this.setState({ errorMessage: null });
      return true;
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          this.setState({
            loading: false,
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
          });
          createdUser.user.updateProfile({
            displayName: this.state.username,
            photoURL: gravatar.profile_url(this.state.email)
          });
        })
        .catch(err => {
          this.setState({ loading: false, errorMessage: err.message });
        });
    }
  };

  handleInputError = inputName => {
    if (this.state.errorMessage !== null) {
      if (this.state.errorMessage.toLowerCase().includes(inputName))
        return 'error';
      return '';
    }
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errorMessage,
      loading
    } = this.state;

    let displayError = '';
    if (errorMessage !== null) {
      displayError = <Message negative> {errorMessage} </Message>;
    }

    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon-color='orange' textAlign='center'>
            <Icon name='puzzle piece' color='blue' />
            Register for Dev Chat
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment>
              <Form.Input
                fluid
                name='username'
                icon='user'
                iconPosition='left'
                placeholder='Username'
                onChange={this.handleChange}
                type='text'
                value={username}
                className={this.handleInputError('username')}
              />
              <Form.Input
                fluid
                name='email'
                icon='mail'
                iconPosition='left'
                placeholder='Email Address'
                onChange={this.handleChange}
                type='email'
                value={email}
                className={this.handleInputError('email')}
              />
              <Form.Input
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                onChange={this.handleChange}
                type='password'
                value={password}
                className={this.handleInputError('password')}
              />
              <Form.Input
                fluid
                name='passwordConfirmation'
                icon='repeat'
                iconPosition='left'
                placeholder='Password Confirmation'
                onChange={this.handleChange}
                type='password'
                value={passwordConfirmation}
                className={this.handleInputError('password')}
              />
              <Button
                fluid
                color='blue'
                size='large'
                disabled={loading}
                className={loading ? 'loading' : ''}
              >
                Submit
              </Button>
            </Segment>
            {displayError}
            <Message>
              Already a user? <Link to='/login'>Login</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
