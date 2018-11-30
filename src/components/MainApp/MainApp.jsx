import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from '../Game/Game.jsx';
import Header from '../Header/Header.jsx';
import StartPage from '../StartPage/StartPage.jsx';

import './MainApp.css';


class MainApp extends React.Component {

    render() {
        let content =
            <Router>
                <div id="container">
                    <Header />
                    <Switch>
                        <Route exact path='/' component={StartPage} />
                        <Route path='/game' component={Game} />
                    </Switch>
                </div>
            </Router>;
        return content;
    }

}

export default MainApp;