import React from 'react';
import { waitForGameToStart } from '../Api/Api.jsx';
import NiceBox from '../Utils/NiceBox.jsx';
import { Redirect } from 'react-router-dom';

class CreateGameWaitPage extends React.Component {

    constructor() {
        super();

        this.state = {
            status: false
        };

    }

    // handleAddingPlayer(err, response) {
    //     if (response.status) {
    //         if (response.status === 200) {
    //             console.log("Player has been added");
    //             // Check if 2 players has been joined
    //             console.log(response);

    //             if (response.players.length === 2) {
    //                 this.setState({
    //                     redirectToGame: true
    //                 });
    //             }
    //         }
    //     }
    //     else {
    //         console.log("Cannot add player");
    //     }
    // }

    componentDidMount() {
        console.log("HEY");
        waitForGameToStart((err, response) => {
            console.log(response);
            switch (response.status) {
                case 200:
                    // Success
                    this.setState({
                        redirectToGame: true,
                        roomData: response.data,
                        playerId: 1
                    });
                    break;
                case 500:
                    // Error
                    console.log("Server Error:", response.data);
                    break;
                default:
                    console.log("Error has been occured");
                    break;
            }
        });
    }

    generateInviteUrl() {
        const url = "http://" + window.location.host + "/game/" + this.props.match.params.id + "/join";
        return url;
    }

    render() {

        if (this.state.redirectToGame === true) {
            return (<Redirect
                to={{
                    pathname: `/game/${this.props.match.params.id}`,
                    state: {
                        roomData: this.state.roomData,
                        playerId: this.state.playerId
                    }
                }} />);
        }

        const inviteUrl = this.generateInviteUrl();
        console.log(this.props);
        const divStyle = {
            border: 0,
            height: "auto",
            backgroundColor: "transparent",
            padding: "10px"
        };
        const inputStyle = {
            border: 0,
            width: "100%",
            textAlign: "left"
        };
        const more = <div className="form-group" style={divStyle}>
            <label htmlFor="inviteUrl">קישור הזמנה:</label>
            <input type="text" className="form-control" name="invite_url" value={inviteUrl} style={inputStyle} />
        </div>;
        return (
            <NiceBox
                title="יאללה, עכשיו לחכות"
                text={<p>עכשיו מחכים לחבר המטומטם שלך, יאללה שיזדרז.</p>}
                more={more}

            />
        );
    }



}

export default CreateGameWaitPage;
