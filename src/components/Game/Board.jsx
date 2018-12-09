import React from 'react';
import Square from './Square.jsx';
import './Board.css';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.getButtonAction = this.getButtonAction.bind(this);

    }

    getButtonAction() {
        // New game offer has been declined
        if(this.props.newGameDeclined){
            if(this.props.offeredNewGame){
                return <span>המניאק לא רוצה...</span>;
            }
            else{
                return <span>יאללה תהיה בריא</span>;
            }
        }
        if (this.props.hasOffer) {
            return (<div>
                
                <span>הבחור מציע משחק חדש, מה אומר?</span>
                <div id="buttons">
                <button className="btn m-1 pr-3 pl-3" onClick={() => { this.props.answerOffer(true) }}>כן</button>
                <button className="btn m-1 pr-3 pl-3" onClick={() => { this.props.answerOffer(false) }}>לא</button>
                </div>
            </div>
            );
        }
        else if (this.props.hasOffered) {
            return (<span>עכשיו מחכים לתשובה...</span>);
        }
        else {
            // Usual
            return (<div>{this.props.status}<br/><button id="offerNewGameBtn" className="btn m-1 pr-3 pl-3" onClick={this.props.offerNewGame}>הצע משחק חדש</button></div>);
        }
    }

    render() {
        // Action button handling
        let offerButtonAction = this.getButtonAction();

        let table = [];
        let tableClassName = this.props.gameEnded ? "blurred" : "";

        for (let i = 0; i < this.props.width; i++) {
            let line = [];
            for (let j = 0; j < this.props.height; j++) {
                let color = "#ffffff";
                let value = this.props.board[i][j];
                console.log(value);
                let activeRow = j === this.props.activeRow;

                // Paint active rows
                if (activeRow && this.props.myTurn && !this.props.gameEnded) {
                    color = this.props.activeRowColor;
                }

                // Paint square according to player
                if (value !== "") {
                    color = this.props.players[value].color;
                }



                line.push(
                    <Square
                        key={(i * this.props.width) + j}
                        row={j}
                        line={i}
                        color={color}
                    //onClick={(row) => this.handleRowClick(row)}
                    />
                );
            }
            table.push(<div className="board-row" key={i}>{line}</div>);
        }
        return (
            <div id="tableContainer" className="mx-auto mb-4">
                <div id="table" className={tableClassName}>
                    {table}

                </div>
                {
                    (this.props.gameEnded === true && this.props.status && !this.props.viewer) &&
                    <div id="statusMessage">
                        {
                            (!this.props.viewer) &&
                            <div id="offerAction">{offerButtonAction}</div>
                        }

                    </div>
                }

            </div>
        );
    }
}

export default Board;