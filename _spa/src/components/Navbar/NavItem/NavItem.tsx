import React from 'react'
import { Link } from 'react-scroll'
import "./NavItem.css";

export type NavItemProps = {
    title: string,
    to: string
}
const NavItem = ({ title, to }: NavItemProps) => {
    return (
        <Link
            activeClass="is-active"
            className="navbar-item"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={-50}
            duration={500}
            delay={0}
            isDynamic={true}
            ignoreCancelEvents={false}
            spyThrottle={500}
            to={to}
        >
            {title}
        </Link>
    )
}


export default NavItem