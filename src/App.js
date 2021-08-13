import React, { useState,useEffect} from "react";
import './App.css';
import Weather from './components/weather';


const App = () =>{

  const [data, setData] = useState([]);
  const [place,setPlace] = useState("");
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        setPlace(data.name);
      });
    }
      fetchData();
      // eslint-disable-next-line
    }, [lat,long])

  const ifclicked=()=>{
    fetch(
      `${process.env.REACT_APP_API_URL}/weather/?q=${place}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    )
    .then(res => {
      if(!(res.ok)){
        alert("enter crt name");
        return res.json();
      }else{
        return res.json();
      }
    })
      .then(result => {
        setData(result)
        console.log(result);
      });
  }

  function search(e) {
    if(e.key === "Enter"){
      ifclicked();
    }
  }

  return(
  <div className="bg">
      <p>WEATHER APP</p>
          <div className="wrap">
            <div className="search">
              <input 
              type="text" 
              className="searchTerm" 
              placeholder="enter a city name"
              value={place}
              onChange={(e)=>setPlace(e.target.value)} 
              onKeyPress={search}/>
              <p type="submit" className="searchButton">
                <i className="fa fa-search"></i>
              </p>
            </div>
            </div>
           <div className="app">
           {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data} />
      ): (
        <div></div>
      )}
           </div>
      
  </div>
  );
}

export default App;