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
            if (!response.error) {
                this.setState({
                    redirectToGame: true,
                    roomData: response.roomData,
                    playerId: 1
                });
            }
            else {
                console.log("Error:", response.error);
            }
            console.log("HEY, I WAS HERE");
        });
    }

    generateInviteUrl() {
        const url = window.location.host + "/game/" + this.props.match.params.id + "/join";
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
            width: "50%"
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
