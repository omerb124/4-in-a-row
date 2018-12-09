import React from 'react';
import './LoadingPage.css';

function LoadingPage(){

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <div id="loadingGifContainer" className="centered">
                        <img src="../../../../loader.gif"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingPage;