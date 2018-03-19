import React from 'react';
import{Link} from 'react-router-dom';

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

export default Home