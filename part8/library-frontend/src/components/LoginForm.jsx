import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { LOGIN } from '../queries/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('book-user-token', token);
      navigate('/');
    }
  }, [result.data]);

  const setValue =
    (f) =>
    ({ target }) =>
      f.call(null, target.value);
  const handleUsername = setValue(setUsername);
  const handlePassword = setValue(setPassword);

  const handleLogin = (event) => {
    event.preventDefault();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} onChange={handleUsername} />
      </div>
      <div>
        password
        <input type="password" value={password} onChange={handlePassword} />
      </div>
      <button type="submit">log in</button>
    </form>
  );
};

export default LoginForm;
