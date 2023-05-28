import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import data from './data.json';
import '@testing-library/jest-dom'

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays users from data.json', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(data.items[0].display_name)).toBeInTheDocument();
      expect(screen.getByText(data.items[1].display_name)).toBeInTheDocument();
    });

    const users = screen.getAllByTestId('user');
    const firstUser = users[0];
    const secondUser = users[1];

    userEvent.click(firstUser.getByText('Block'));
    userEvent.click(secondUser.getByText('Block'));

    await waitFor(() => {
      expect(firstUser.getByText('Unblock')).toBeInTheDocument();
      expect(secondUser.getByText('Unblock')).toBeInTheDocument();
    });

    userEvent.click(firstUser.getByText('Unblock'));
    userEvent.click(secondUser.getByText('Unblock'));

    await waitFor(() => {
      expect(firstUser.getByText('Block')).toBeInTheDocument();
      expect(secondUser.getByText('Block')).toBeInTheDocument();
    });
  });
});
