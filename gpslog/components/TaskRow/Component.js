import React from 'react';

import Render from './Render';

import {
    StyleSheet,
    Image,
} from 'react-native';

class TaskRow extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    onDonePressed() {
        console.log("onDonePressed returning: " + this.props.todo.task);
        this.props.onDone(this.props.todo);
    }

    onIsImportantPressed() {
        this.props.isImportant(this.props.todo);
    }

    chooseImage() {
        if(this.props.filter === "done"){
            return (
                <Image
                    source={require('../../images/notDone.png')}
                />
            );
        }else{ // pending
            return (
                <Image
                    source={require('../../images/done.png')}
                />
            );
        }
    }

    render(){
        const styles = this.props.styles();
        return Render.bind(this)(styles);
    }
}

TaskRow.propTypes = {
    filter: React.PropTypes.string.isRequired,
    onDone: React.PropTypes.func.isRequired,
    isImportant: React.PropTypes.func.isRequired,
    todo: React.PropTypes.shape({
        task: React.PropTypes.string.isRequired,
        isImportant: React.PropTypes.bool.isRequired,
    }).isRequired,
    styles: React.PropTypes.func.isRequired,
};

export default TaskRow;
