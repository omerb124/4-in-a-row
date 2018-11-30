import React from 'react';
import {Link} from 'react-router-dom';

class StartPage extends React.Component{

    render(){
        return (
            <div>
                <span>Hey, Welcome!</span><br/>
                <Link to='/game'>Click Here to start playing</Link>
            </div>
        );
    }
}

export default StartPage;