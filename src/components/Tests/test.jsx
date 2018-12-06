import React from 'react';
import * as Api from '../Api/Api';

class Test extends React.Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    render(){
        switch(this.props.match.params.actionName){
            case 'updateResultTableByRoomId':
                Api.updateResultTableByRoomId("5c0923671e3eb8239c9a3af9",[['0','2'],['1','2']])
                break;
        }

        return(<div>Test has been done, logs are waiting on console.</div>);
    }
}

export default Test;