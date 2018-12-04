import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './CreateGamePage.css';
import NiceBox from '../Utils/NiceBox.jsx';
import {createRoom} from '../Api/Api.jsx';


class CreateGamePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            color: null,
        };

        // // Default
        // this._name1 = "שחקן 1";
        // this._name2 = "שחקן 2";
        // this._color1 = "#f1c40f";
        // this._color2 = "#e74c3c";

        this.name = React.createRef();
        this.color = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
    }

    // Validate that the whole params are ok
    validateParams() {
        let valid = true;
        console.log(Object.values(this.state));
        Object.values(this.state).forEach((a) => { if (!a) valid = false });
        return valid;
    }

    componentDidMount() {
        const a = [...document.getElementsByTagName("input")];

        a.forEach((v) => v.addEventListener('keyup', () => this.handleChange()));

        this.setState({
            color: this.color.current.value,
            name: this.name.current.value
        });


    }

    handleCreateRoom() {
        const playerSettings = {
            color: this.state.color,
            name: this.state.name
        };
        createRoom(playerSettings,  (err, response) => {

            switch (response.status) {
                case 200:
                    // Success
                    this.setState(
                        {
                            playerSettings: playerSettings,
                            roomId: response.data,
                            toGamePage: true
                        }
                    );
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

    handleChange() {

        this.setState({
            color: this.color.current.value,
            name: this.name.current.value
        });
        this.forceUpdate();
    }

    render() {
        console.log(this.state);
        const title = "רק כמה שאלות...";
        const text = false;
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
                        <input className="form-control" required type="text" placeholder=" הזן שם..." id="playerOneName" ref={this.name} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="player1_name" className="text-center col-3 col-form-label">צבע שחקן</label>
                    <div className="col-6">
                        <input className="form-control" onChange={this.handleChange} style={colorInputStyle} type="color" id="playerOneColor" defaultValue="#f1c40f" list="colors" ref={this.color} />
                    </div>
                </div>
            </div>
            <div id="actionBtn" className="mx-auto col-12">
                {
                    this.validateParams() &&
                    <button className="actionBtn" onClick={this.handleCreateRoom}>יאללה, בוא נפתח חדר</button>
                }

            </div>
        </div >;

        // Navigate to next page if neccessary
        if (this.state.toGamePage) {
            return (
                <Redirect
                    to={{
                        pathname: `/game/${this.state.roomId}/wait`,
                        state: { playerSettings: this.state.playerSettings}
                    }}
                />
            );
        }

        return (
            <NiceBox
                title={title}
                text={text}
                more={form}
            />
        );
    }

}

export default CreateGamePage;