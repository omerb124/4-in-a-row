import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ResultsTable from '../Game/ResultsTable.jsx';
import axios from 'axios';
import { getRoomData, getUpdate, waitForGameToStart } from '../Api/Api';
import Board from '../Game/Board';
import GameHeader from '../Game/GameHeader';
import NiceBox from '../Utils/NiceBox';
import LoadingPage from '../Pages/LoadingPage.jsx';

// View Page
class ViewGamePage extends React.Component {

    constructor() {
        super();


        this.state = { roomDataRecieved: false };

        this.handleRoomData = this.handleRoomData.bind(this);
        this.handleGameUpdate = this.handleGameUpdate.bind(this);
    }

    handleGameUpdate(err, response) {

        switch (response.status) {
            case 200:
                // Success
                this.setState({
                    board: response.data.board,
                    currentTurn: response.data.turn
                });
                break;
            case 400:
            case 404:
                // Error
                this.setState({ roomNotFound: true });
                console.log("Error:", response.data);
                break;
            case 500:
                // Server Error
                this.setState({ roomNotFound: true });
                console.log("Server Error:", response.data);
                break;
            default:
                this.setState({ roomNotFound: true });
                console.log("Error has been occured");
                break;
        }
    }

    handleRoomData(err, response) {
        console.log(response);

        switch (response.status) {
            case 200:
                // Success
                this.setState({
                    board: response.data.board,
                    players: response.data.players,
                    currentTurn: response.data.turn,
                    roomId: response.data.id,
                    resultsTable: response.data.resultsTable,
                    roomDataRecieved: true
                });
                break;
            case 202:
                // Wait for game to start
                this.setState({ gameBeforeStart: true });
                // Listen to 'startGame' event
                waitForGameToStart((err, response) => {
                    switch (response.status) {
                        case 200:
                            // Success
                            console.log(response);
                            this.setState({
                                gameBeforeStart: false,
                                board: response.data.board,
                                currentTurn: true,
                                players: response.data.players,
                                resultsTable: response.data.resultsTable,
                                roomId: this.props.match.params.id
                            });
                            break;
                        case 500:
                            // Error
                            this.setState({ roomNotFound: true });
                            console.log("Server Error:", response.data);
                            break;
                        default:
                            this.setState({ roomNotFound: true });
                            console.log("Error has been occured");
                            break;
                    }
                });


                break;
            case 400:
            case 404:
                // Error: room id not found or not valid
                this.setState({ roomNotFound: true });
                console.log("Error:", response.data);
                break;
            case 500:
                // Server Error
                this.setState({ roomNotFound: true });
                console.log("Server Error:", response.data);
                break;
            default:
                this.setState({ roomNotFound: true });
                console.log("Error has been occured");
                break;
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
        // Room Not Found
        if (this.state.roomNotFound) {
            return (<Redirect to="/roomNotFound" />);
        }

        // Game has not been started yet
        if (this.state.gameBeforeStart === true) {
            return (
                <NiceBox
                    title="המשחק עוד לא התחיל"
                    text={<p>מחכים לבחור השני... יאללה נקווה שיזדרז</p>}
                />
            );
        }

        // Be sure that room data is available
        if (this.state.roomDataRecieved === false) {
            return (<LoadingPage />);
        }

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
                    <div className="mx-auto">
                        <Switch>
                            <Route exact path={`/game/${this.state.roomId}/view`} component={() => {
                                return this.renderBoard();
                            }} />
                            <Route path={`/game/${this.state.roomId}/view/results`} component={() => { return <ResultsTable table={this.state.resultsTable} /> }} />
                        </Switch>
                        </div>
                    </div>
                </div>
                );
            }
        }
        
export default ViewGamePage;