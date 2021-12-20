import React from 'react';
import Navbar from './Navbar/Navbar';
import NavbarProfile from './Navbar/NavbarProfile';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../../m2-bll/store';

type NavbarPropsType = {}

const Header: React.FC<NavbarPropsType> = () => {

    const isInitialized = useSelector<RootStateType, boolean>(state => state.login.isLoggedIn)

    return (
        <div>
            {isInitialized ? <NavbarProfile/> : <Navbar/>}
        </div>
    );
}
export default Header;