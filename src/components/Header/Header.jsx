import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

const Header = () => (
        <nav>
        <div id="gameName">
            <Link to='/'>ארבע בפאקינג שורה!</Link>
        </div>
     </nav>
);

export default Header;