import React from 'react';
import './styles.css';
import moment from 'moment';
import 'moment-timezone';



const WeatherCard = ({weatherData}) =>{

  let imglink = weatherData.weather[0].icon;
  let val = "http://openweathermap.org/img/wn/"+imglink+"@2x.png";
  let temp = weatherData.main.temp;
  let temp1 = temp.toFixed(1);
  return(
    <div className="main">
      
        <div className="placename">
              <p className="header">{weatherData.name}, {weatherData.sys.country}</p>
              <p className="day">{moment().format('MMMM')} {moment().format('D')}, {moment().format('hh:mm')}   </p>
        </div>

        <div className="otherdetails">
          <div className="imgplace">
            <img src={val} alt="" className="img"></img>
              <div className="heading">
                <p className="temp"> {temp1}&deg;C</p>
                <p className="description">{weatherData.weather[0].description}</p>
              </div>
          </div>
  
              <div className="flex">
                <p className="hum">H : {weatherData.main.humidity} %</p>
                <p className="hum">SR : {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                <p className="hum">SS : {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                <p className="hum">WS : {weatherData.wind.speed}mph</p>
              </div>
        </div>
    </div>
)
}
  export default WeatherCard;