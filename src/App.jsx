import React, { Component } from 'react'
import Home from './components/Home/Home'
import './App.css'
import Header from './components/Header/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'



export class App extends Component {
  render() {
    return (
      <div className='app'>
        <ToastContainer position='top-center'/>
        <Header/>
        <Home/>
      </div>
    )
  }
}

export default App