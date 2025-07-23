import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient } from '@apollo/client';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

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
        {!token ? null : <button onClick={handleLogout}>logout</button>}
      </nav>

      <Routes>
        <Route index element={<Authors />} />
        <Route path="books">
          <Route index element={<Books />} />
          <Route path="new" element={<NewBook />} />
        </Route>
        <Route path="login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
