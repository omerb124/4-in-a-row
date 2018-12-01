import React from 'react';
import { Link } from 'react-router-dom';
import './CreateGamePage.css';
import NiceBox from '../Utils/NiceBox.jsx';

class CreateGamePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name1: null,
            name2: null,
            color1: null,
            color2: null
        };

        // // Default
        // this._name1 = "שחקן 1";
        // this._name2 = "שחקן 2";
        // this._color1 = "#f1c40f";
        // this._color2 = "#e74c3c";

        this.name1 = React.createRef();
        this.name2 = React.createRef();
        this.color1 = React.createRef();
        this.color2 = React.createRef();

        //this.handleChange = this.handleChange.bind(this);
        this.getLinkObject = this.getLinkObject.bind(this);
        this.generateRoomId = this.generateRoomId.bind(this);
    }

    generateRoomId(){
        let L = 10; // ID Length
        let s = '';
        let randomchar = function() {
            let n = Math.floor(Math.random() * 62);
            if (n < 10) return n; //1-10
            if (n < 36) return String.fromCharCode(n + 55); //A-Z
            return String.fromCharCode(n + 61); //a-z
        }
        while (s.length < L) s += randomchar();
        return s;
    }

    // Validate that the whole params are ok
    validateParams() {
        let valid = true;
        console.log(Object.values(this.state));
        Object.values(this.state).forEach((a) => { if (!a) valid = false });
        return valid;
    }

    getLinkObject() {
        const roomId = this.generateRoomId();
        return {
            'pathname': '/game/' + roomId,
            'roomId' : roomId,
            'params': this.state
        };
    }

    componentDidMount() {
        console.log(this.name1);
        const a = [...document.getElementsByTagName("input")];

        a.forEach((v) => v.addEventListener('keyup', () => this.handleChange()));

        this.setState({
            color1: this.color1.current.value,
            color2: this.color2.current.value,
            name1: this.name1.current.value,
            name2: this.name2.current.value
        });


    }

    handleChange() {

        this.setState({
            color1: this.color1.current.value,
            color2: this.color2.current.value,
            name1: this.name1.current.value,
            name2: this.name2.current.value
        });
        this.forceUpdate();
    }

    render() {
        console.log(this.state);
        const title = "רק כמה שאלות...";
        const text = false;
        const style = {
            padding: "10px"
        };
        const colorInputStyle = {
            width: "100px",
            height: "60px",
            backgroundColor: "transparent",
            border: "0"
        };

        const form = <div id="settingsForm" style={style}>
            <div id="form">
                <div className="form-group row">
                    <label htmlFor="player1_name" className="text-center col-3 col-form-label">שם שחקן 1</label>
                    <div className="col-6">
                        <input className="form-control" required type="text" placeholder=" הזן שם..." id="playerOneName" ref={this.name1} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="player1_name" className="text-center col-3 col-form-label">צבע שחקן 1</label>
                    <div className="col-6">
                        <input className="form-control" style={colorInputStyle} type="color" id="playerOneColor" defaultValue="#f1c40f" list="colors" ref={this.color1} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="player2_name" className="text-center col-3 col-form-label">שם שחקן 2</label>
                    <div className="col-6">
                        <input className="form-control" required type="text" placeholder=" הזן שם..." id="playerTwoName" ref={this.name2} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="player1_name" className="text-center col-3 col-form-label">צבע שחקן 2</label>
                    <div className="col-6">
                        <input className="form-control" style={colorInputStyle} type="color" id="playerTwoColor" defaultValue="#e74c3c" list="colors" ref={this.color2} />
                    </div>
                </div>
            </div>
            <div id="actionBtn" className="mx-auto col-12">
                {
                    this.validateParams()
                        ? <Link to={this.getLinkObject()}>
                            <button className="actionBtn">יאללה בוא נתחיל</button>
                        </Link>
                        : <button className="actionBtn" onClick={() => alert("בטוח שמילאת הכל?")}>יאללה בוא נתחיל</button>
                }

            </div>
        </div >;

        return (
            <NiceBox
                title={title}
                text={text}
                more={form}
            />
        );
    }

}

export default CreateGamePage;