import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import fetchData from './api';

jest.mock('./api');

describe('App', () => {
  beforeEach(() => {
    fetchData.mockResolvedValue({
      items: [
        {
          user_id: '1',
          profile_image: 'image1.jpg',
          display_name: 'Joe',
          reputation: 100,
        },
        {
          user_id: '2',
          profile_image: 'image2.jpg',
          display_name: 'Sandy',
          reputation: 200,
        },
      ],
    });
  });

  test('blocks/unblocks user when button is clicked', async () => {
    render(<App />);
    await waitFor(() => {
      expect(fetchData).toHaveBeenCalled();
    });

    const blockButtons = screen.getAllByText('Block');
    const initialBlockButtonCount = blockButtons.length;

    const blockButton = blockButtons[0];
    expect(blockButton).toBeTruthy();

    userEvent.click(blockButton);

    await waitFor(() => {
      const updatedBlockButtons = screen.queryAllByText('Block');
      const updatedUnblockButtons = screen.queryAllByText('Unblock');
      // NOTE Expect one less block button
      expect(updatedBlockButtons.length).toBe(initialBlockButtonCount - 1);
      // NOTE Expect one unblock button
      expect(updatedUnblockButtons.length).toBe(1);
    });

    const unblockButton = screen.getByText('Unblock');
    expect(unblockButton).toBeTruthy();

    userEvent.click(unblockButton);

    await waitFor(() => {
      const finalBlockButtons = screen.queryAllByText('Block');
      const finalUnblockButtons = screen.queryAllByText('Unblock');
      // NOTE Expect the initial count of block buttons
      expect(finalBlockButtons.length).toBe(initialBlockButtonCount);
      // NOTE Expect no unblock button
      expect(finalUnblockButtons.length).toBe(0);
    });
  });
});
