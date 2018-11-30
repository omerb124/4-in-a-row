import React from 'react';

import { Route, Link, Switch } from 'react-router-dom';

class GameHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    getBtnsMenu() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="mx-auto">
                        <Switch>
                            <Route
                                exact
                                path="/game"
                                render={() => (
                                    <Link to='/game/results' key="1">
                                        <button id="watchResultsTable" className="btn-success" key="1">
                                            צפה בלוח תוצאות
                                        </button>
                                    </Link>
                                )}
                            />
                            <Route
                                exact
                                path="/game/results"
                                render={() => (
                                    <Link to='/game' key="1">
                                        <button id="watchResultsTable" className="btn-success" key="1">
                                            חזור למשחק
                                        </button>
                                    </Link>
                                )}
                            />

                        </Switch>
                        <button id="startNewGame" onClick={this.props.handleStartNewGame} className="btn-success" key="1">
                            התחל משחק חדש
                        </button>
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