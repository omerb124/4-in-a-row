import React from 'react';
import { getLeaderboard } from '../../Api/Api';
import '../LoadingPage.jsx';
import LoadingPage from '../LoadingPage.jsx';

class Leaderboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = { loading: true };

        this.handleLeaderboardData = this.handleLeaderboardData.bind(this);

    }

    handleLeaderboardData(err, response) {
        // Amount of players to show
        const playersAmount = 10;
        if (response.data.length !== 0) {
            const data = response.data.slice(0, playersAmount);
            this.setState({
                loading: undefined,
                data: data
            });
            if (localStorage.getItem("leaderboardData") !== undefined) {
                localStorage.setItem("leaderboardData", data);
            }
        }
        else {
            this.setState({
                loading: undefined,
                noResults: true
            });
        }
    }

    renderBoard() {
        let arr = [];
        this.state.data.forEach((v, i) => {
            arr.push(<tr key={i}><td>{v[0]}</td><td>{v[1]}</td></tr>);
        });
        return <tbody>{arr}</tbody>;
    }

    componentDidMount() {
        if (localStorage.getItem("leaderboardData") !== undefined) {
            getLeaderboard(this.handleLeaderboardData);
        }
        else {
            this.handleLeaderboardData(null, { data: localStorage.getItem("leaderboardData") });
        }

    }

    render() {

        if (this.state.loading) {
            return <LoadingPage />;
        }

        let tbody;
        if (this.state.noResults) {
            tbody = <span>אין שחקנים בלוח.</span>;
        }
        else{
            tbody = this.renderBoard();
        }
        return (
            <div id="roomsList" className="col-8">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">שם</th>
                            <th scope="col">נצחונות</th>
                        </tr>
                    </thead>
                    {tbody}
                </table>
            </div>
        );
    }
}

export default Leaderboard;