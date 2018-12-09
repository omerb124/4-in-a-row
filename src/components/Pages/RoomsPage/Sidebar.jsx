import React from 'react';
import './Sidebar.css';
import { Link, Switch, Route } from 'react-router-dom';

function Sidebar(props) {

    return (
        <div id="sidebar" className="text-center col-4 mx-auto">
            <Link to="/create">
                <button className="btn btn-block">
                    צור חדר
            </button>
            </Link>
            <button onClick={() => { props.doRandomChoose(2) }} className="btn btn-block">
                הצטרף לחדר רנדומלי
            </button>
            <button onClick={() => { props.doRandomChoose(1) }} className="btn btn-block">
                צפה בחדר רנדומלי
            </button>
            <Switch>
                <Route exact path="/" component={() => (
                    <Link to="/leaderboard">
                        <button className="btn btn-block">
                            שחקנים מובילים
                        </button>
                    </Link>
                )} />
                <Route path="/leaderboard" component={() => (
                    <Link to="/">
                        <button className="btn btn-block">
                            חזרה לרשימה
                        </button>
                    </Link>
                )} />

            </Switch>
        </div>
    );
}

export default Sidebar;