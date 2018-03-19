import React from 'react';
var Link = require('react-router-dom').Link;

const Home = () => (
    <div className='home-container'>
        <h1>
            Github Battle: Battle your friends on github 
        </h1>
        <Link className='link-battle' to='/battle'>
            Battle
        </Link>    
    </div>
)
module.exports = Home ;