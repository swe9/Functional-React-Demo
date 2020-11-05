import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import store from './app/store'

// Test failed without explict Provider wrapper, borrowed this from index.js
test('renders App', () => {
  render(<Provider store={store}><App/></Provider>);
  const textElement = screen.getByText(/Giphy/i);
  expect(textElement).toBeInTheDocument();
  const gridElement = screen.getByText("Empty List");
  expect(gridElement).toBeInTheDocument();
});
