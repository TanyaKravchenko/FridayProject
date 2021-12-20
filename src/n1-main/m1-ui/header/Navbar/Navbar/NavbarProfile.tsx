import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Navbar.module.scss';
import {path} from '../../../routes/Routes';

type NavbarPropsType = {}

const NavbarProfile: React.FC<NavbarPropsType> = () => {
    return (
        <div>
            <div className={s.navLogotype}>
                LearnCards
            </div>
            <div className={s.navLinkItems}>
                <div className={s.item}>
                    <NavLink to={path.PACKS} className={s.navLink}
                             activeClassName={s.active}> Packs list </NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to={path.PROFILE} className={s.navLink}
                             activeClassName={s.active}> Profile </NavLink>
                </div>
            </div>
        </div>
    );
}

export default NavbarProfile;