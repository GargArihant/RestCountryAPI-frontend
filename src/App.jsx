import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./components/Home/Home.jsx";
import Country from './components/Country/Country';
import Navbar from './components/Navbar/Navbar';

export const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('dark');
  const style= {
    '--Dark-Blue':      (theme == 'dark')? 'hsl(209, 23%, 22%)': 'hsl(0, 0%, 100%)',
    '--Very-Dark-Blue':     (theme == 'dark')? 'hsl(207, 26%, 17%)' : 'hsl(0, 0%, 98%)',
    '--text':              (theme == 'dark')? 'hsl(0, 0%, 100%)':  'hsl(200, 15%, 8%)',
    '--Dark-Gray':           'hsl(0, 0%, 52%)',
  }

  return (
    <div style={{backgroundColor: style['--Very-Dark-Blue'], height: '100vh'}}>
    <ThemeContext.Provider value={[theme, setTheme, style]}>
    <Routes>
      <Route path='/' element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path='/:name' element={<Country />} />
      </Route>
    </Routes>
    </ThemeContext.Provider>
    </div>
  )
}

export default App
