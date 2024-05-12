import React, { Component } from 'react'
import './Main.css'
import axios from 'axios'
import Weather from '../Weather/Weather'
import {toast} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

export class Main extends Component {
    state = {
        localeInput: "",
        weatherList: [],
        weatherDisplayed: {},
        displayHidden: true
    }

    async ComponentDidMount(){
        try {
            const allLocales = await axios.get("http://localhost:3001/weather/get-all-searched-locations")
            console.log(allLocales);
            this.setState({weatherList: allLocales.data.payload})
        } catch (error) {
            console.log(error);
        }
    }


    handleOnChange = (e)=>{
        this.setState({
            localeInput: e.target.value
        })
    }

    handleOnSubmit = async (event)=>{
        event.preventDefault()
        try {
            if(this.state.localeInput !== ""){
                let currentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.localeInput}&appid={import.meta.env.VITE_API_KEY}&units=imperial`)
                let weatherDisplay = await axios.post('http://localhost:3000/weather/add-location', {
                    location: currentWeather.data.name,
                    country: currentWeather.data.sys.country,
                    temperature: currentWeather.data.main.temp,
                    description: currentWeather.data.weather[0].description,
                    icon: currentWeather.data.weather[0].icon
                })
                let newArray = [...this.state.weatherList, weatherDisplay.data.payload]
                this.setState({
                    weatherList: newArray,
                    weatherDisplayed: weatherDisplay.data.payload,
                    displayHidden: false 
                })
                
            }
        } catch (error) {
            toast.error('Please enter valid city')
        }
        this.setState({
            localeInput: ''
        })
    }

    handleOnDelete = async (id)=>{
        let deletedLocale = await axios.delete(`http://localhost:3000/weather/delete-location/${id}`)
        let newArray = this.state.weatherList.filter(i=>i._id !== id)
        this.setState({
            weatherList: newArray
        })
    }

    handleDisplay = (weather)=>{
        this.setState({
            weatherDisplayed: weather,
            displayHidden: false
        })
    }


  render() {
    <div className='outer-container'>
    <div className="form-container">
        <form onSubmit={this.handleOnSubmit} className="form">
            <input onChange={this.handleOnChange} value={this.state.localeInput} placeholder='City name' type="text" name="city" id="city" />
            <button type="submit">Search City</button>
        </form>
    </div>
    <div className="weather-container">
        <ul>
            {this.state.weatherList.map((item)=>{
                return (
                   <Weather key={item._id} handleDisplay={this.handleDisplay}
                   handleOnDelete={this.handleOnDelete} 
                   weather={item} /> 
                )
            })}
        </ul>
    </div>
    <div className={`weather-display-container ${this.state.displayHidden ? "hidden" : ""}`} >
        <h1>{this.state.weatherDisplayed.location}, {this.state.weatherDisplayed.country}</h1>
        <p>Temperature: {this.state.weatherDisplayed.temperature} °F</p>
        <p>{this.state.weatherDisplayed.description}</p>
    </div>
  </div>

}
}

export default Main