import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from '../../App'
import './Navbar.css'
function Navbar() {
  const [theme, setTheme,style] = useContext(ThemeContext);
  const toggleTheme = () => {
    setTheme((theme == 'light')? 'dark':'light')
  }
  return (
    <>
    <nav className='navbar' style={{ 
    backgroundColor: style['--Dark-Blue'],
    color: style['--text'],
      }}>
        <h1 style={{marginLeft: '80px'}}>Where in the world?</h1>
        <div style={{ position: 'absolute', right: '80px'}}>
            <button onClick={toggleTheme} style={{backgroundColor:  style['--Dark-Blue'],
             border: 'none', color: style['--text'],
             display: 'flex',
             flexDirection: 'row',
             gap: '10px',
             alignItems: 'center',
             }}>
            <ion-icon name="moon-outline"></ion-icon>
                {(theme == 'dark')? <span>Light mode</span>: <span>Dark mode</span>}
            </button>
        </div>
    </nav>
    <Outlet />
    </>
  )
}

export default Navbar