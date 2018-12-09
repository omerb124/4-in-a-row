import React from 'react';
import './NiceBox.css';

function NiceBox(props) {

    const textStyle = props.textStyle ? props.textStyle : {};
    const boxStyle = props.style ? props.style : {};
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="nice-box col-sm-5 mx-auto mt-5" style={boxStyle}>
                    <div id="title" className="text-center">
                        <h4>{props.title}</h4>
                    </div>
                    {props.text &&
                        <div id="box-text" style={textStyle}>
                            {props.text}
                        </div>
                    }
                    {props.more && 
                        props.more
                    }
                </div>
            </div>
        </div>
    );
}

export default NiceBox;