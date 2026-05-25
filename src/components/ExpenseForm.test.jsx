import { render, screen } from '@testing-library/react';
import ExpenseForm from './ExpenseForm';

describe('ExpenseForm Component', () => {

  test('renders add expense heading', () => {

    render(<ExpenseForm />);

    const textElement = screen.getByRole('heading', {
  name: 'Add Expense',
});

    expect(textElement).toBeTruthy();

  });

});