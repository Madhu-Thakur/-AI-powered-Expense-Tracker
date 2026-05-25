import { render } from '@testing-library/react';

import { Provider } from 'react-redux';

import store from '../store';

import App from '../App';

describe('App Component', () => {

  test('renders app', () => {

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

  });

});