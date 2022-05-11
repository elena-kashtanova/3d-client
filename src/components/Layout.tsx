import { NavLink, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="app">
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/models">Library</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export { Layout };
