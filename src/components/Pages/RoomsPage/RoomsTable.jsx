import React from 'react';
import RoomsTableRow from './RoomsTableRow';
import './RoomsTable.css';

class RoomsTable extends React.Component {

    constructor(props){
        super(props);

        this.renderTableBody = this.renderTableBody.bind(this);
    }

    renderTableBody(){
        let body = [];
        this.props.rooms.forEach((value,index) => {
            let roomName = "החדר של " + value.players[0].name;
            body.push(<RoomsTableRow key={index} name={roomName} status={value.isOpen} id={value._id.$oid} />);
        });

        return <tbody>{body}</tbody>;
    }

    render() {
        let tableBody = this.renderTableBody();
        return (
            <div id="roomsList" className="col-8">
                <table className="table table-sm text-right">
                    <thead>
                        <tr>
                            <th width="50%" className="text-right" scope="col">שם חדר</th>
                            <th scope="col">סטטוס</th>
                            <th></th>
                        </tr>
                    </thead>
                    {tableBody}
                </table>
            </div>
        );
    }

}

export default RoomsTable;