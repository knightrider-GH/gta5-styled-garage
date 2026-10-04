import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo" style={{ textDecoration: 'none' }}>PAPE MOTORS</NavLink>
        <ul className="nav-links" style={{ alignItems: 'center' }}>
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'nav-active' : ''}>Home</NavLink></li>
          <li><NavLink to="/recommend" className={({ isActive }) => isActive ? 'nav-active' : ''}>Smart Recommendation</NavLink></li>
          <li><NavLink to="/compare" className={({ isActive }) => isActive ? 'nav-active' : ''}>Compare</NavLink></li>
          <li>
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                background: isDark ? '#222530' : '#e2e5ec',
                border: '1px solid ' + (isDark ? '#f0b90b' : '#333'),
                color: isDark ? '#f0b90b' : '#111',
                padding: '4px 12px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
