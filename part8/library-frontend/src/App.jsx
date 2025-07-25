import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient, useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import RecommendedBooks from './components/RecommendedBooks';
import Notify from './components/Notify';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('book-user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  const handleNotify = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    apolloClient.clearStore();
    navigate('/');
  };

  const linkStyles = {
    textDecoration: 'none',
    color: 'black',
  };
  return (
    <div>
      <Notify message={message} />
      <nav>
        <button>
          <NavLink to="/" style={linkStyles}>
            authors
          </NavLink>
        </button>
        <button>
          <NavLink to="/books" style={linkStyles}>
            books
          </NavLink>
        </button>
        <button>
          <NavLink to={token ? '/books/new' : '/login'} style={linkStyles}>
            {token ? 'add book' : 'login'}
          </NavLink>
        </button>
        {token && (
          <button>
            <NavLink to="/recommend" style={linkStyles}>
              recommend
            </NavLink>
          </button>
        )}
        {token && <button onClick={handleLogout}>logout</button>}
      </nav>

      <Routes>
        <Route index element={<Authors />} />
        <Route path="books">
          <Route index element={<Books handleNotify={handleNotify} />} />
          <Route path="new" element={<NewBook />} />
        </Route>
        <Route path="login" element={<LoginForm setToken={setToken} />} />
        <Route path="recommend" element={<RecommendedBooks />} />
      </Routes>
    </div>
  );
};

export default App;
