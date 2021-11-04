import React from 'react';
import './App.css';
import Navbar from '../header/Navbar/Navbar';
import Routes from '../routes/Routes';

const App = () => {
    return (
        <div className="App">
            <Navbar/>
            <Routes/>
        </div>
    );
}

export default App;
