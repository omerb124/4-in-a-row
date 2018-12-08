import React from 'react';
import './ResultsTable.css';
import Result from './Result.jsx';

class ResultsTable extends React.Component {

    constructor(props) {
        super(props);
    }

    renderTable() {
        const dataTable = this.props.table;
        let table = [];
        dataTable.forEach((value,index) => {
            table.push(
                <Result
                    key={index}
                    id={index}
                    date={value[1]}
                    playerName={value[0]}
                />
            );
        });

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">שם מנצח</th>
                        <th scope="col">תאריך</th>
                    </tr>
                </thead>
                <tbody>
                {table}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div id="resultsTable">
                {
                    this.props.table.length > 0
                        ? this.renderTable()
                        : "אין תוצאות בטבלת התוצאות עדיין."
                }
            </div>
        );
    }

}

export default ResultsTable;