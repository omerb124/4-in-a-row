import React from 'react';
import {Link} from 'react-router-dom';

class RoomsTableRow extends React.Component {

    constructor(props) {
        super(props);
    }

    generateButtons() {
        if(this.props.status){
            // Waiting for opponent
            let url = "/game/" + this.props.id + "/join";
            return (
                <Link to={url}>
                <button type="button" data-status="wait" className="btn">
                    הצטרף
                </button>
                </Link>
            );
        }
        else{
            // Game is active
            let url = "/game/" + this.props.id + "/view";
            return (
                <Link to={url}>
                <button type="button" data-status="active" className="btn">
                    צפה
                </button>
                </Link>
            );

        }
    }


    render() {
        let actionButton = this.generateButtons();
        let statusString = this.props.status ? "ממתין למתחרה" : "במשחק";
        
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{statusString}</td>
                <td>{actionButton}</td>
            </tr>
        );

    }
}

export default RoomsTableRow;