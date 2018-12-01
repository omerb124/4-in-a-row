import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

const Header = () => (
        <nav>
        <div id="gameName">
            <Link to='/'>ארבע בפאקינג שורה!</Link>
        </div>
        <ul id="mainMenu">
            <Link to="/about"><li>אודות!</li></Link>
            <li>חוקים!</li>
            <li>אל תלחץ פה</li>
        </ul>
     </nav>
);

export default Header;