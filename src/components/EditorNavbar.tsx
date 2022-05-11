import { NavLink } from 'react-router-dom';

function EditorNavbar() {
  return (
    <nav className="navbar editor-navbar">
      <NavLink end to="/models">
        Back
      </NavLink>
    </nav>
  );
}

export { EditorNavbar };
