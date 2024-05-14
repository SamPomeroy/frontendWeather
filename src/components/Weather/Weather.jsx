import React, { Component } from 'react'
import './Weather.css'


export class Weather extends Component {
  
  render() {
    const {description, country, location, temperature, _id} = this.props.weather
    const {handleOnDelete, handleDisplay} = this.props
    return (
      <div className='weather-div'>
        {
          <li><a onClick={()=>handleDisplay(this.props.weather)} >{location}</a> , {country}</li>
        }
          <button onClick={()=>handleOnDelete(_id)} >Delete</button>
      </div>
    )
  }
}

export default Weather