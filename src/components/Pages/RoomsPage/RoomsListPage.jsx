import React from 'react';
import { getRoomsData } from '../../Api/Api';
import LoadingPage from '../LoadingPage.jsx';
import Sidebar from './Sidebar.jsx';
import RoomsTable from './RoomsTable.jsx';
import './RoomsListPage.css';
import Leaderboard from './Leaderboard.jsx';
import { Switch, Route } from 'react-router-dom';

class RoomsListPage extends React.Component {

    constructor() {
        super();

        this.state = { loading: true };

        this.handleRoomsData = this.handleRoomsData.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.doRandomChoose = this.doRandomChoose.bind(this);
    }

    componentWillMount() {
        document.title = "Rooms";
    }

    handleRoomsData(err, data) {
        if (data.data) {
            this.setState({
                roomsData: data.data,
                loading: undefined
            });
        }
        else {
            console.log("Cannot load rooms data.");
        }
    }

    // Random number
    getRandNumber(from, to) {
        return Math.floor(Math.random() * (1 + to - from)) + from;
    }

    // view/join to random room
    doRandomChoose(type) {
        // type == 1 > view
        // type == 2 > join
        if (type === 1 || type === 2) {
            let b = type === 1 ? "active" : "wait";
            let a = document.querySelectorAll("button[data-status='" + b + "']");
            if (a.length == 0) {
                alert("אין משהו זמין חביבי");
            }
            else {
                a[this.getRandNumber(0, a.length - 1)].click();
            }
        }
        else {
            // Do nothing
        }
    }

    renderTable() {
        return (
            <RoomsTable
                rooms={this.state.roomsData}
            />
        );
    }

    componentDidMount() {
        // Get rooms data
        getRoomsData(this.handleRoomsData);
    }

    render() {

        if (this.state.loading) {
            return <LoadingPage />;
        }

        let table = this.renderTable();
        let sidebar = <Sidebar doRandomChoose={this.doRandomChoose} />;
        return (

            <div className="container">
                <div className="row">
                    <div id="roomsPage" class="col-sm-8 mx-auto text-center mt-3">
                        <h2 className="title p-2 mt-3">
                            <Switch>
                                <Route exact path="/" component={() => {return ("יאללה בחר חדר");}} />
                                <Route exact path="/leaderboard" component={() => {return ("שחקנים מובילים");}} />

                            </Switch>
                            
                        </h2>
                        <div className="row">
                            {sidebar}
                            <Switch>
                                <Route exact path="/" component={() => this.renderTable()} />
                                <Route path="/leaderboard" component={() => <Leaderboard />} />
                            </Switch>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default RoomsListPage;