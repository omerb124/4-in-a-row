import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { getRoomData, getUpdate } from '../Api/Api';
import Board from '../Game/Board';
import GameHeader from '../Game/GameHeader';

// View Page
class ViewGamePage extends React.Component {

    constructor() {
        super();


        // Default state
        this.state = {
            board: Array(9).fill(Array(9).fill("")),
            players: []
        };


        this.handleRoomData = this.handleRoomData.bind(this);
        this.handleGameUpdate = this.handleGameUpdate.bind(this);
    }

    handleGameUpdate(err, response) {
        if (response.updatedData) {
            this.setState({
                board: response.updatedData.board,
                currentTurn: response.updatedData.turn
            });
        }
    }

    handleRoomData(err, response) {
        console.log(response);
        if (response.status === 200 && response.data) {
            // Success
            this.setState({
                board: response.data.board,
                players: response.data.players,
                currentTurn: response.data.turn,
                roomId: response.data.id
            });
        }
        else if (response.status === 202) {
            // Warning
            this.setState({ roomNotFound: true });
        }
        else {
            // Error
            console.log("Error has been occured during handling room data");
            this.setState({ roomNotFound: true });
        }
        
    }

    componentWillMount() {
        const roomId = this.props.match.params.id;

        // Get updated room data
        if (roomId) {
            getRoomData(roomId, this.handleRoomData);
        }
        else {
            this.setState({ roomNotFound: true });
        }


    }

    // Rendering board
    renderBoard() {
        return (
            <Board
                players={this.state.players}
                width="9"
                height="9"
                board={this.state.board}
            />
        )
    }

    componentDidMount() {
        // Be aware of game updates
        getUpdate(this.handleGameUpdate);
    }

    render() {
        if (this.state.roomNotFound) {
            // Room Not Found
            return (<Redirect to="/NotFoundPage" />);
        }
        console.log(this.state);
        const status = <span>
            {
                this.state.players.length !== 0 &&
                (this.state.currentTurn === 1
                    ? "התור של " + this.state.players[0].name
                    : "התור של " + this.state.players[1].name)
            }
        </span>;

        return (
            <div className="container-fluid">
                <GameHeader
                    status={status}
                    roomId={this.props.match.params.id}
                    viewer={true}
                />
                <div className="row">
                    {this.renderBoard()}
                </div>
            </div>
        );
    }
}

export default ViewGamePage;