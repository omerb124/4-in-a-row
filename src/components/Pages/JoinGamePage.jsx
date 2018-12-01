import React from 'react';
import { addPlayer } from '../Api/Api';
import NiceBox from '../Utils/NiceBox.jsx';

class JoinGamePage extends React.Component {

    constructor() {
        super();

        this.state = {
            name: null,
            color: null
        };
        this.handleJoiningRoom = this.handleJoiningRoom.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // Handling input change
    handleInputChange() {
        this.setState({
            name: this.name.current.value,
            color: this.color.current.value
        });
    }

    handleJoiningRoom() {

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
                        <input className="form-control" onKeyUp={this.handleInputChange} style={colorInputStyle} type="color" id="playerOneColor" defaultValue="#f1c40f" list="colors" ref={this.color} />
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

        return (
            <NiceBox
                title="הצטרף לחדר"
                more={form}
            />
        );

    }
}

export default JoinGamePage;