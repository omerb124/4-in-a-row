import React from 'react';

function Result(props){
    
    return (
        <tr><td>{props.id + 1}</td><td>{props.date}</td><td>{props.playerName}</td></tr>
    );


}

export default Result;