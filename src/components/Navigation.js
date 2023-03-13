import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/navigation.css";
const Navigation = () => {
  return (
    <>
    <div className="navigation">

        <ul>
            <NavLink to="/"  className={(nav)=>nav.isActive? "nav-active":"" }>
                <li>acceuil</li>
            </NavLink>
            <NavLink to="/about"  className={(nav)=>nav.isActive? "nav-active":"" }>
            <li>à propos</li>
            </NavLink>
            <NavLink to="/blog"  className={(nav)=>nav.isActive? "nav-active":"" }>
            <li>Blog</li>
            </NavLink>
            
        </ul>
    </div>
    </>
  )
}

export default Navigation