import React, { Component } from 'react'
import Main from './components/Main/Main'
import './App.css'
import Header from './components/Header/Header'
import { ToastContainer } from 'react-toastify'



export class App extends Component {
  render() {
    return (
      <div className='app'>
        <ToastContainer position='top-center'/>
        <Header/>
        <Main/>
      </div>
    )
  }
}

export default App