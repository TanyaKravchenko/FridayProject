import React from 'react';
import './App.css';
import Navbar from '../header/Navbar/Navbar';
import Routes from '../routes/Routes';
import {Preloader} from '../../../common/preloader/Preloaders';
import {RootStateType} from '../../m2-bll/store';
import {RequestStatusType} from '../../m2-bll/reducers/app-reducer';
import {useSelector} from 'react-redux';

const App = () => {
    //hooks
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <Navbar/>
            <Routes/>
            {status === 'loading' && <Preloader/>}
            {/*<Preloader/>*/}
        </div>
    );
}

export default App;
