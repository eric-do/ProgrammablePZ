import { render, fireEvent } from 'utils/test-utils';
import { Login } from 'features/auth/screens';

describe('<Login />', () => {
  test('User can fill input fields', () => {
    const { getByLabelText } = render(<Login />);
    const usernameInput = getByLabelText('Username');
  })
});