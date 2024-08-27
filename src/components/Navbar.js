// src/components/Navbar.js
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pokemon">Pokémon List</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
