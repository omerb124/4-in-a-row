import React from 'react';
import './Square.css';

// Square component
class Square extends React.Component {

    render() {

        const style = {
            backgroundColor: this.props.color
        };
        const classString = "square";

        return (
            <button
                className={classString}
                style={style}
            >
            </button>
        );
    }

}

export default Square;