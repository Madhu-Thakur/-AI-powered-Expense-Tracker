import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';

import store from '../store';

import Login from './Login';

describe('Login Component', () => {

  test('renders login text', () => {

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const textElement = screen.getByRole('heading', {
      name: 'Login',
    });

    expect(textElement).toBeTruthy();

  });

});