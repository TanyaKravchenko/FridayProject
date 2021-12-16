import React, {useEffect} from 'react';
import './App.css';
import Navbar from '../header/Navbar/Navbar';
import Routes from '../routes/Routes';
import {Preloader} from '../../../common/preloader/Preloaders';
import {RootStateType} from '../../m2-bll/store';
import {initializedTC, RequestStatusType} from '../../m2-bll/reducers/app-reducer';
import {useDispatch, useSelector} from 'react-redux';

const App = () => {
    //hooks
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    // const isInitialized = useSelector<RootStateType, boolean>(state => state.app.isInitialized)
    // const loginIn = useSelector<RootStateType, boolean>(state => state.login.isLoggedIn)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializedTC())
    }, [])

    // if(!isInitialized ){
    //     return <Preloader/>
    // }

    return (
        <div className="App">
            <Navbar/>
            <Routes/>
            {status === 'loading' && <Preloader/>}
        </div>
    );
}

export default App;
