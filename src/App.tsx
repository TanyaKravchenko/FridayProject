import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Routes from './Components/Routes';

const App = () => {
    return (
        <div className="App">
            <Navbar/>
            <Routes/>
        </div>
    );
}

export default App;
