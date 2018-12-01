import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

//import './Game.css';
import Board from './Board.jsx';
import ResultsTable from './ResultsTable.jsx';
import GameHeader from './GameHeader.jsx';

// Whole game component
class Game extends React.Component {

    constructor(props) {
        super(props);

        // Settings
        this.width = 9; // Lines amount
        this.height = 9; // Rows amount
        this.activeRowColor = "#ecf0f1"; // Active row color

        // Players
        if (!this.players) {
            this.players = [];
            this.players[0] = {
                color: "#f1c40f",
                name: "שחקן 1"
            };
            this.players[1] = {
                color: "#e74c3c",
                name: "שחקן 2"
            };
        }


        this.state = {
            // Turn changer
            isPlayer1Turn: true,
            board: this.createBoard(),
            activeRow: Math.round((this.width - 1) / 2),
            currentTurn: 1,
            resultsTable: []
        };

        this.handleRowClick = this.handleRowClick.bind(this);
        this.findEmptySpot = this.findEmptySpot.bind(this);
        this.handleStartNewGame = this.handleStartNewGame.bind(this);

    }

    // Create empty board
    createBoard() {
        return Array(this.width).fill(Array(this.height).fill(""));
    }

    // Adding result to results table
    addGameResult(winner) {
        if (!this.state.resultAdded) {
            let wonPlayerName = winner === "0" ? this.players[0].name :this.players[1].name;
            const currentDate = new Date().toLocaleString();
            let newTable = Object.values(Object.assign({}, this.state.resultsTable));
            console.log("NEW TABLE " + newTable);
            newTable.push({ wonPlayerName: wonPlayerName, currentDate: currentDate });
            console.log(newTable);
            this.setState({
                resultsTable: newTable,
                resultAdded: true
            });
        }

    }

    // Handling request for start a new game
    handleStartNewGame() {
        // Check if there is a winner || this is the first turn
        if (this.checkWinner() === false && this.state.currentTurn > 1) {
            var m = window.confirm("האם אתה בטוח שתרצה להתחיל משחק חדש?\nאם תעשה זאת, לא תוכל לחזור למשחק הנוכחי בעתיד.");
            if (m) {
                this.setState({
                    board: this.createBoard()
                });
            }
            else {
                console.log(this.state.currentTurn);
                window.focus();
            }
        }
        else {
            this.setState({
                board: this.createBoard(),
                isPlayer1Turn: true
            });
        }
    }

    // Generate bottom menu
    getBottomMenu() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="mx-auto">
                        <switch>
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

                        </switch>
                        <button id="startNewGame" onClick={this.handleStartNewGame} className="btn-success" key="1">
                            התחל משחק חדש
                        </button>
                    </div>
                </div>
            </div>
        );


    }

    // Finding the proper spot of specific row
    findEmptySpot(row) {
        let found = false;
        let emptySpotId;
        for (let j = this.height - 1; j >= 0; j--) {
            if (this.state.board[j][row] === "") {
                console.log("Empty spot has been found!");
                found = true;
                emptySpotId = j;
            }
            if (found) {
                break;
            }
        }
        if (found) {
            return emptySpotId;
        }
        return false;
    }

    // Handling click on square
    handleRowClick(row) {

        // Update winner
        if (this.checkWinner() !== false || this.checkBoardFullness() !== false) {
            return;
        }

        // Find out the proper square
        const emptySpotId = this.findEmptySpot(row);

        // Validate that its an empty spot
        if (emptySpotId === false) {
            return;
        }

        // Create the new row
        const newRow = Object.assign({}, this.state.board[emptySpotId]);
        newRow[row] = this.state.isPlayer1Turn ? "0" : "1";

        // Create new board
        const newBoard = Object.assign({}, this.state.board);
        newBoard[emptySpotId] = newRow;

        // 1. Update new board
        // 2. Change turn
        // 3. Change currentTurn to next turn
        this.setState({
            board: newBoard,
            isPlayer1Turn: !this.state.isPlayer1Turn,
            currentTurn: this.state.currentTurn + 1
        });


    }

    // There is a winner?
    checkWinner() {
        // Check rows
        let win = false;

        const checkEqual = arr => arr.every(v => (v === arr[0] && v !== ''));
        console.log("CHECK WINNER.");
        const board = this.state.board;
        for (let i = 0; i < this.width; i++) {

            for (let j = 0; j < this.height; j++) {

                // Check row win
                if (j <= this.height - 4) {
                    //console.log("LINE:" + [board[i][j+1],board[i][j+2],board[i][j+3],board[i][j]]);
                    win = checkEqual([board[i][j + 1], board[i][j + 2], board[i][j + 3], board[i][j]]) ? board[i][j] : false;
                    if (win !== false) break;
                }

                // Check line & diagonal win 
                if (i <= this.width - 4) {
                    //console.log("ROW:" + [board[i+1][j],board[i+2][j],board[i+3][j],board[i][j]]);
                    win = checkEqual([board[i + 1][j], board[i + 2][j], board[i + 3][j], board[i][j]]) ? board[i][j] : false;
                    if (win !== false) break;

                    // Check diagonal line
                    if (j <= this.height - 4) {
                        win = checkEqual([board[i + 1][j + 1], board[i + 2][j + 2], board[i + 3][j + 3], board[i][j]]) ? board[i][j] : false;
                        //console.log("MAYBE WIN? " + [board[i][j],board[i+1][j+1],board[i+2][j+2],board[i+3][j+3]] + "LINE: " + i + ",ROW: " + j);
                        if (win !== false) break;
                    }
                }

                if (i <= this.width - 4 && j >= 3) {
                    win = checkEqual([board[i][j], board[i + 1][j - 1], board[i + 2][j - 2], board[i + 3][j - 3]]) ? board[i][j] : false;
                    //console.log("MAYBE WIN? " + [board[i + 3][j - 3], board[i + 2][j - 2], board[i + 1][j - 1], board[i][j]] + "LINE: " + i + ",ROW: " + j);
                    if (win !== false) break;
                }


            }

            // Break out from second for loop
            if (win !== false) {
                break;
            }
        }

        if (win !== false) return win;
        return false;
    }

    // Handling keypress
    _handleKeyPress(e) {

        // If there is a winner || full board, key won't change anything
        if (this.checkWinner() || this.checkBoardFullness()) {
            return false;
        }

        let newActiveRow;
        let activeRow = this.state.activeRow;
        switch (e.code) {
            case 'ArrowRight':
                // Right
                e.stopPropagation();
                newActiveRow = (activeRow + 1) % (this.width);
                this.setState({
                    'activeRow': newActiveRow
                });
                break;
            case 'ArrowLeft':
                // Left
                e.stopPropagation();
                newActiveRow = (activeRow === 0) ? this.width - 1 : activeRow - 1;
                this.setState({
                    'activeRow': newActiveRow
                });
                break;
            case 'Space':
                // Enter
                e.preventDefault();
                this.handleRowClick(this.state.activeRow);
                break;
            default:
            // Nothing
        }
    }

    // component will mount
    componentWillMount() {
        if (this.props.location.params) {
            this.players[0].name = this.props.location.params.name1;
            this.players[0].color = this.props.location.params.color1;
            this.players[1].name = this.props.location.params.name2;
            this.players[1].color = this.props.location.params.color2;
        }
        console.log(this.props.location);
        document.addEventListener("keyup", this._handleKeyPress.bind(this));
    }

    // Rendering board
    renderBoard() {
        return (
            <Board
                players={this.players}
                activeRow={this.state.activeRow}
                activeRowColor={this.activeRowColor}
                width={this.width}
                height={this.height}
                board={this.state.board}
            />
        )
    }

    // Check if board is full
    checkBoardFullness() {
        return Object.values(this.state.board).every(arr => Object.values(arr).every(value => value !== ""));
    }

    render() {
        console.log(this.state.isPlayer1Turn);

        // Status
        let status;
        const winner = this.checkWinner(); // Check if there is a winner
        const fullBoard = this.checkBoardFullness();
        const style = {
            color: this.state.isPlayer1Turn ? this.players[0].color : this.players[1].color
        };

        if (!winner) {
            // No winner
            if (fullBoard) {
                status = "תיקו יא חביבי";
            }
            else {
                status = <span>התור של <span style={style}>{this.state.isPlayer1Turn ? this.players[0].name : this.players[1].name}</span></span>
            }
        }
        else {
            // Add Winning to results table
            this.addGameResult(winner);
            status = <span>המנצח הוא <span style={{ color: this.players[winner].color }}>{winner === "0" ? this.players[0].name : this.players[1].name}</span></span>
        }

        return (
            <div className="container-fluid">
                <div className="row" id="board">
                    <div className="mx-auto">
                        <div>
                            <GameHeader
                                status={status}
                                handleStartNewGame={this.handleStartNewGame}
                            />
                            <Switch>
                                <Route exact path='/game' component={() => this.renderBoard()} />
                                <Route path='/game/results' component={() => <ResultsTable table={this.state.resultsTable} />} />
                            </Switch>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;



