import React from 'react';
import './Square.css';

// Square component
class Square extends React.Component {

    render() {

        const style = {
            backgroundColor: this.props.color
        };

        return (
            <button
                className="square"
                style={style}
            >
            </button>
        );
    }

}

export default Square;