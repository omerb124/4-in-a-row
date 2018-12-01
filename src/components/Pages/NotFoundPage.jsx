import React from 'react';
import NiceBox from '../Utils/NiceBox.jsx';

function NotFoundPage(props) {

    const textStyle = { textAlign: "center" };
    return (
        <div id="notFound">
            <NiceBox
                title="404"
                text={<img alt="not found" src="./notFound.png" />}
                textStyle = {textStyle}
            />
        </div>
    );
}

export default NotFoundPage;