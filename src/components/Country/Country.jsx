import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../App';
import './Country.css'
function Country() {
    const name = useParams();
    const [country, setCountry] = useState(null);
    const [theme, setTheme, style] = useContext(ThemeContext);
    const navigate = useNavigate();
    console.log(name);
    console.log(country);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,subregion,tld,currencies,languages,borders`)
        .then((response) => {
            response.data.map((data) => {
              if (data['name']['common'] == name['name']) {
                setCountry(data);
              } else { return false;}
            })
        })
    },[])

    const currenciyFun = (obj) => {
      return Object.values(obj).map((value) => { 
        return value['name']
      } );
    } 
    const languageFun = (obj) => {
      return Object.values(obj).join(', ')
    }
    const goBack = () => {
        navigate('/')
    }
  return (
    <>
    <button onClick={goBack} 
    style={{
        backgroundColor: style['--Dark-Blue'],
        border: 'var(--Very-Dark-Blue-text) solid 2px',
        marginLeft: '120px',
        marginTop: '30px',
        width: '120px',
        height: '30px',
        color: style['--text'],
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        cursor: 'pointer',
    }}><ion-icon name="arrow-back-outline"></ion-icon>
      <span style={{
        fontSize: '0.8rem',
        fontWeight: '600',
      }}>Back</span></button>
    {country &&
    <div className='single-container' style={{
     
      justifyContent: 'space-evenly',
      marginTop: '20vh',
    }}>
      <img src={country['flags']['png']} alt="" style={{
        borderRadius: '5px',
        boxShadow: '0 10px 30px var(--Very-Dark-Blue-text)',
        maxWidth: '30vw',
        maxHeight: '30vh',
      }} />
      <div className="info" style={{
        height: '240px',
    }}>
      <h2 style={{
        color: style['--text'], paddingTop: '20px', paddingLeft: '20px',
        fontSize: '1.5rem',
        fontWeight: '600'
        }}>{country['name']['official']}</h2>
        <div style={{
          height: '60%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          color: style['--text'],
            fontSize: '1rem',
            fontWeight: '300',
            padding: '20px'
        }}>
          <div className="left" style={{
          }}>
            <p><span style={{
              fontWeight: '600'
            }}>Native name: </span>&nbsp;{country['name']['common']}</p>
            <p><span style={{
              fontWeight: '600'
            }}>Population: </span>&nbsp;{country['population']}</p>
            <p><span style={{
              fontWeight: '600'
            }}>Region: </span>&nbsp;{country['region']}</p>
            <p><span style={{
              fontWeight: '600'
            }}>Sub Region: </span>&nbsp;{country['subregion']}</p>
            <p><span style={{
              fontWeight: '600'
            }}>Capital: </span>&nbsp;{country['capital']}</p>
          </div>
          <div className="right" style={{
            color: style['--text']
          }}>
            <p><span style={{
              fontWeight: '600',
            }}>Top Level Domain: </span>&nbsp;{country['tld']}</p>
            <p><span style={{
              fontWeight: '600'
            }}>Currencies: </span>&nbsp;{currenciyFun(country['currencies'])}</p>
            <p><span style={{
              fontWeight: '600'
            }}>Languages: </span>&nbsp;{languageFun(country['languages'])}</p>
          </div>
        </div>
        <div className="bottom" style={{
            color: style['--text'],
            marginTop: '20px',
            marginLeft: '5vw',
          }}>
          <p style={{
              fontWeight: '600',
            }}>Border Countries: </p>{country['borders'].map((border, index) => {
            return <span style={{
              marginLeft: '5vw',
              padding: '2px 7px',
              backgroundColor: style['--Dark-Blue'],
              borderRadius: '5px',
              justifyContent: 'center',
              boxShadow: '0 5px 10px var(--Very-Dark-Blue-text)'
            }} key={index}>{border} </span>
          })}
        </div>
    </div>
    </div> 
    }

    </>
  )
}

export default Country