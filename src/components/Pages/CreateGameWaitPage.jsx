import React from 'react';
import { addPlayer } from '../Api/Api.jsx';
import NiceBox from '../Utils/NiceBox.jsx';
import { Redirect } from 'react-router-dom';

class CreateGameWaitPage extends React.Component {

    constructor() {
        super();

        this.state = {
            status: false
        };

        this.handleAddingPlayer = this.handleAddingPlayer.bind(this);
    }

    handleAddingPlayer(err, response) {
        if (response.status) {
            if (response.status === 200) {
                console.log("Player has been added");
                // Check if 2 players has been joined
                console.log(response);

                if (response.players.length === 2) {
                    this.setState({
                        redirectToGame: true
                    });
                }
            }
        }
        else {
            console.log("Cannot add player");
        }
    }

    componentDidMount() {
        if (this.props.location.state) {
            // The room owner
            const playerSettings = this.props.location.state.playerSettings;
            addPlayer(playerSettings, this.handleAddingPlayer);
            this.setState({
                user_type: 'owner'
            });
        }
    }

    generateInviteUrl() {
        const url = window.location.host + "/game/" + this.props.match.params.id + "/join";
        return url;
    }

    render() {

        if (this.state.redirectToGame === true) {
            return (<Redirect to="/bobo" />);
        }
        const inviteUrl = this.generateInviteUrl();
        console.log(this.props);
        const divStyle = {
            border:0,
            height:"auto",
            backgroundColor:"transparent",
            padding: "10px"
        };
        const inputStyle = {
            border:0
        };
        const more = <div className="form-group" style={divStyle}>
            <label htmlFor="inviteUrl">קישור הזמנה:</label>
            <input type="text" className="form-control" name="invite_url" value={inviteUrl} />
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
