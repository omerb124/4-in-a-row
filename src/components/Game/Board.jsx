import React from 'react';
import Square from './Square.jsx';
import './Board.css';

class Board extends React.Component {

    render() {
        let table = [];
        for (let i = 0; i < this.props.width; i++) {
            let line = [];
            for (let j = 0; j < this.props.height; j++) {
                let color = "#ffffff";
                let value = this.props.board[i][j];
                console.log(value);
                let activeRow = j === this.props.activeRow;

                // Paint active rows
                if (activeRow) {
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
                        activeRow={j === this.props.activeRow}
                    //onClick={(row) => this.handleRowClick(row)}
                    />
                );
            }
            table.push(<div className="board-row" key={i}>{line}</div>);
        }
        return (
            <div id="table" className="mx-auto">
                {table}
            </div>
        );
    }
}

export default Board;