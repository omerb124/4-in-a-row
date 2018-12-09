import React from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';

function Sidebar(props) {

    return (
        <div id="sidebar" class="text-center col-4 mx-auto">
            <Link to="/create">
            <button className="btn btn-block">
                צור חדר
            </button>
            </Link>
            <button onClick={() => {props.doRandomChoose(2)}} className="btn btn-block">
                הצטרף לחדר רנדומלי
            </button>
            <button onClick={() => {props.doRandomChoose(1)}} className="btn btn-block">
                צפה בחדר רנדומלי
            </button>
        </div>
    );
}

export default Sidebar;