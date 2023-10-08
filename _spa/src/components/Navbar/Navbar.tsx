/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import NavItem from './NavItem/NavItem';
import { navBarItems } from '../../constants/constants';

enum TabState {
    Active = "is-active",
    NotActive = ""
}

const Navbar = () => {
    const [tab, setTab] = useState<TabState>(TabState.NotActive);
    const handleBurgerIconClick = () => {
        if (tab === TabState.Active) setTab(TabState.NotActive)
        else setTab(TabState.Active)
    }
    return (
        <nav className="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
            <a onClick={handleBurgerIconClick} role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>

            <div className={`navbar-menu ${tab}`}>
                <div className="navbar-end">
                    {navBarItems.map(navBarItem => (
                        <NavItem key={navBarItem.title} {...navBarItem} />
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar