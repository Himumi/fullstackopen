import { useState } from "react";
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");

  const linkStyles = {
    textDecoration: 'none',
    color: 'black',
  }
  return (
    <Router>
      <nav>
        <button>
          <NavLink to='/' style={linkStyles}>authors</NavLink>
        </button>
        <button>
          <NavLink to='/books' style={linkStyles}>books</NavLink>
        </button>
        <button>
          <NavLink to='/books/new' style={linkStyles}>add book</NavLink>
        </button>
      </nav>

      <Routes>
        <Route index element={<Authors />} />
        <Route path="books">
          <Route index element={<Books />} />
          <Route path="new" element={<NewBook />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
