import React from 'react';
import { Redirect } from 'react-router-dom';
import { joinRoom } from '../Api/Api';
import NiceBox from '../Utils/NiceBox.jsx';

class JoinGamePage extends React.Component {

    constructor() {
        super();

        this.state = {
            name: null,
            color: null
        };

        this.name = React.createRef();
        this.color = React.createRef();

        this.handleJoiningRoom = this.handleJoiningRoom.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // Handling input change
    handleInputChange() {
        
        this.setState({
            name: this.name.current.value,
            color: this.color.current.value
        });

        //console.log(this.state.color);
    }

    handleJoiningRoom() {
        const playerSettings = {
            name: this.state.name,
            color: this.state.color
        };
        const roomId = this.props.match.params.id;
        joinRoom(playerSettings, roomId, (err, response) => {

            switch (response.status) {
                case 200:
                    // Success
                    this.setState({
                        redirectToGame: true,
                        roomData: response.data,
                        playerId: 2
                    });
                    break;
                case 409:
                    // Same color as first player or game is progress
                    alert(response.data);
                    break;
                case 400:
                case 404:
                    // Error
                    console.log("Error:", response.data);
                    break;
                case 500:
                    // Server Error
                    console.log("Server Error:", response.data);
                    break;
                default:
                    console.log("Error has been occured");
                    break;
            }
        });
    }

    validateParams() {
        return (
            this.state.name &&
            this.state.name.length > 0 &&
            this.state.color &&
            this.state.color.length > 0 &&
            this.state.color !== "#ffffff" &&
            this.state.color !== "#fff"
        );
    }

    render() {
        const style = {
            padding: "10px"
        };
        const colorInputStyle = {
            width: "100px",
            height: "60px",
            backgroundColor: "transparent",
            border: "0"
        };
        const form = <div id="settingsForm" style={style}>
            <div id="form">
                <div className="form-group row">
                    <label htmlFor="player1_name" className="text-center col-3 col-form-label">שם שחקן</label>
                    <div className="col-6">
                        <input className="form-control" onKeyUp={this.handleInputChange} required type="text" placeholder=" הזן שם..." id="playerOneName" ref={this.name} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="player1_name" className="text-center col-3 col-form-label">צבע שחקן</label>
                    <div className="col-6">
                        <input className="form-control" onChange={this.handleInputChange} style={colorInputStyle} type="color" id="playerOneColor" defaultValue="#f1c40f" list="colors" ref={this.color} />
                    </div>
                </div>
            </div>
            <div id="actionBtn" className="mx-auto col-12">
                {
                    this.validateParams() &&
                    <button className="actionBtn" onClick={this.handleJoiningRoom}>הצטרף לחדר</button>
                }

            </div>
        </div >;

        if (this.state.redirectToGame) {
            return (<Redirect
                to={{
                    pathname: `/game/${this.props.match.params.id}`,
                    state: {
                        roomData: this.state.roomData,
                        playerId: this.state.playerId
                    }
                }} />);
        }

        return (
            <NiceBox
                title="הצטרף לחדר"
                more={form}
            />
        );

    }
}

export default JoinGamePage;