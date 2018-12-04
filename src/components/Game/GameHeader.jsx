import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import './GameHeader.css';

class GameHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            props: props
        };
    }

    

    getBtnsMenu() {
        let previousUrl = "/game/" + this.state.props.roomId;
        if(this.props.viewer){
            previousUrl += "/view";
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="mx-auto">
                        <Switch>
                            <Route
                                path={previousUrl + "/results"}
                                render={() => (
                                    <Link to={previousUrl} key="1">
                                        <button id="watchResultsTable" className="btn-success" key="1">
                                            חזור למשחק
                                        </button>
                                    </Link>
                                )}
                            />
                            <Route

                                path={previousUrl}
                                render={() => (
                                    <Link to={previousUrl + "/results"} key="1">
                                        <button id="watchResultsTable" className="btn-success" key="1">
                                            צפה בלוח תוצאות
                                        </button>
                                    </Link>
                                )}
                            />


                        </Switch>
                        {/* <button id="startNewGame" onClick={this.state.props.handleStartNewGame} className="btn-success" key="1">
                            התחל משחק חדש
                        </button> */}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div id="gameHeader" className="text-center mx-auto">
                <h4>{this.props.status}</h4>
                <div id="bottomMenu">
                    {this.getBtnsMenu()}
                </div>
            </div>
        );
    }
}

export default GameHeader;