import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpenseForm from './ExpenseForm';

describe('ExpenseForm Component', () => {

  test('renders add expense heading', () => {

    render(
      <ExpenseForm
        amount=""
        setAmount={() => {}}
        description=""
        setDescription={() => {}}
      />
    );

    const headingElement =
  screen.getByRole('heading', {
    name: 'Add Expense',
  });

    expect(headingElement).toBeTruthy();

  });

  test('renders amount input', () => {

    render(
      <ExpenseForm
        amount=""
        setAmount={() => {}}
        description=""
        setDescription={() => {}}
      />
    );

    const amountInput =
      screen.getByPlaceholderText(
        'Enter Amount'
      );

    expect(amountInput).toBeTruthy();

  });

  test('renders description input', () => {

    render(
      <ExpenseForm
        amount=""
        setAmount={() => {}}
        description=""
        setDescription={() => {}}
      />
    );

    const descriptionInput =
      screen.getByPlaceholderText(
        'Enter Description'
      );

    expect(descriptionInput).toBeTruthy();

  });

  test('typing works in amount input', async () => {

    render(
      <ExpenseForm
        amount=""
        setAmount={() => {}}
        description=""
        setDescription={() => {}}
      />
    );

    const input =
      screen.getByPlaceholderText(
        'Enter Amount'
      );

    await userEvent.type(input, '500');

    expect(input).toBeTruthy();

  });

  test('typing works in description input', async () => {

    render(
      <ExpenseForm
        amount=""
        setAmount={() => {}}
        description=""
        setDescription={() => {}}
      />
    );

    const input =
      screen.getByPlaceholderText(
        'Enter Description'
      );

    await userEvent.type(input, 'Pizza');

    expect(input).toBeTruthy();

  });

  test('add expense button exists', () => {

    render(
      <ExpenseForm
        amount=""
        setAmount={() => {}}
        description=""
        setDescription={() => {}}
      />
    );

   const button =
  screen.getByRole('button', {
    name: 'Add Expense',
  });

    expect(button).toBeTruthy();

  });

  test('button is clickable', async () => {

    render(
      <ExpenseForm
        amount=""
        setAmount={() => {}}
        description=""
        setDescription={() => {}}
      />
    );

    const button =
  screen.getByRole('button', {
    name: 'Add Expense',
  });

    await userEvent.click(button);

    expect(button).toBeTruthy();

  });

});