import React from 'react';
import {addPlayer} from '../Api/Api.jsx';
import NiceBox from '../Utils/NiceBox.jsx';
import {Redirect} from 'react-router-dom';

class CreateGameWaitPage extends React.Component {

    constructor(){
        super();

        this.state = {
            status: false
        };

        this.handleAddingPlayer = this.handleAddingPlayer.bind(this);
    }

    handleAddingPlayer(err,response){
        if(response.status){
            if(response.status === 200){
                console.log("Player has been added");
                // Check if 2 players has been joined
                console.log(response);

                if(response.players.length === 2){
                    this.setState({
                        redirectToGame : true
                    });
                }
            }
        }
        else{
            console.log("Cannot add player");
        }
    }

    componentDidMount(){
        if(this.props.location.state){
            // The room owner
            const playerSettings = this.props.location.state.playerSettings;
            addPlayer(playerSettings,this.handleAddingPlayer);
            this.setState({
                user_type: 'owner'
            });
        }
        else{
            this.setState({
                user_type: 'joins'
            });
        }
    }

    render() {
        
        if(this.state.redirectToGame === true){
            return (<Redirect to="/bobo" />);
        }

        return (
            <NiceBox
                title="יאללה, עכשיו לחכות"
                text={<p>כרגע מחכים לשחקן השני. תצעק לו, אולי אז הוא יגיע מהר יותר.</p>}

            />
        );
    }



}

export default CreateGameWaitPage;
