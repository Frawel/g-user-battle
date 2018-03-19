import React from 'react';
var  NavLink = require ('react-router-dom').NavLink;

const Nav = () => (
    <ul className='nav'>
        <li>
            <NavLink exact to='/'>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to='/battle'>
                Battle
            </NavLink>
        </li>
        <li>
            <NavLink to='/popular'>
                Popular
            </NavLink>
        </li>
    </ul>
)

export default Nav;