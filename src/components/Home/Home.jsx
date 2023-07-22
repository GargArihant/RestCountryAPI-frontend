import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import "./Home.css"
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
function Home() {
  const [data, setData] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [theme, setTheme, style] = useContext(ThemeContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all?fields=region')
    .then(response => {
      const uniqueRegion = [];
      response.data.map((obj) => {
              if (uniqueRegion.includes(obj['region'])) {return false}
              else {uniqueRegion.push(obj['region']);}
            })
      setData(uniqueRegion);        
    });
    if (region == '') {
    axios.get('https://restcountries.com/v3.1/all?fields=flags,name,capital,region,population')
    .then(response => setCountryData(response.data.slice(0,8)));
     }}
     ,[region])
     const searchName = () => {
      if (name == '') {return false}
      else {navigate(`/${name}`)}  
     }
     const regionFun = (ev) => {
      console.log('event fired')
        setRegion(ev.target.value);
        if (region == '') {return false}
        else {
        axios.get(`https://restcountries.com/v3.1/region/${region}`)
        .then(response => setCountryData(response.data.slice(0,8)));
        }
     }
  return (
    <>
    <div className='searchBar' style={{ height: '10vh',}}>
    <div id="searchForm">
      <button onClick={searchName} style={{
        backgroundColor: style['--Dark-Blue']
      }}><ion-icon name="search-outline" style={{color: style['--text'],}}></ion-icon></button>
      <input type="search" name="search" id="search" style={{
        color: style['--text'],
        backgroundColor: style['--Dark-Blue']
      }} placeholder='Search for a country...' onChange={(ev) => setName(ev.target.value) } />
      </div>
      <input list='regions' name='regions' id='region' style={{
        color: style['--text'],
        backgroundColor: style['--Dark-Blue']
      }} placeholder='Filter by Region' onChange={regionFun} />
      <datalist id='regions' style={{backgroundColor: style['--Dark-Blue']}}>
        {data && data.map((region, index) => { return <option value={region} key={index} />})}
      </datalist>
    </div>
    <div className="grid-container" >
    {countryData && countryData.map((country, index) => { return <a key={index} href={`/${country['name']['common']}`} style={{textDecoration: 'none'}}> <div  style={{
    color: style['--text'],
    height: '265px',
    backgroundColor: style['--Dark-Blue'],
    borderRadius: '10px',
  }}>
          <img src={country['flags']['png']} alt="" height='50%' width='100%' style={{borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}} />
          <h2 style={{fontSize: '1.1rem', fontWeight: '600', paddingLeft: '20px', paddingTop: '10px'}}>{country['name']['official']}</h2>
          <h3 style={{paddingLeft: '20px', fontSize: '1rem', fontWeight: '300', paddingTop: '20px'}}><span style={{fontSize: '1rem', fontWeight: '600'}}>Population: </span>{country['population']}</h3>
          <h3 style={{paddingLeft: '20px', fontSize: '1rem', fontWeight: '300'}}><span style={{fontSize: '1rem', fontWeight: '600'}}>Region: </span>{country['region']}</h3>
          <h3 style={{paddingLeft: '20px', fontSize: '1rem', fontWeight: '300'}}><span style={{fontSize: '1rem', fontWeight: '600'}}>Capital: </span>{country['capital'][0]}</h3>
        </div></a>
    })}
    </div>
    </>
  )
}

export default Home