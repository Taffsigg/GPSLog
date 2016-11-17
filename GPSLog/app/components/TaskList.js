import React from 'react';

import {
    View,
    ListView,
    StyleSheet,
    TouchableHighlight,
    Text,
    Switch,
} from 'react-native';

import TaskRow from './TaskRow/Component';

class TaskList extends React.Component {
    constructor(props, context) {
        super(props, context);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.filteredTodos),
        };
    }

    componentWillReceiveProps(nextProps) {
        const dataSource = this.state.dataSource.cloneWithRows(nextProps.filteredTodos);

        this.setState({
            dataSource,
        });
    }

    renderRow(todo) {
        return (
            <TaskRow
                onDone={this.props.onDone}
                isImportant={this.props.isImportant}
                todo={todo}
                filter={this.props.filter}
                styles={this.props.styles}
            />
        );
    }

    render() {
        const styles = this.props.styles();
        return (
                <View style={[styles.container, styles.containerPaddingTop]}>

                    <View
                        style={{
                            flexDirection: 'row',
                            padding: 10,
                        }}
                    >
                        <Switch
                            onValueChange={this.props.onToggle}
                            style={{
                                marginBottom: 0,
                            }}
                            value={this.props.filter !== 'pending'}
                        />
                        <Text style={{
                            fontSize: 20,
                            paddingLeft: 10,
                            paddingTop: 3,
                        }}
                        >
                            Showing {this.props.filteredTodos.length} {this.props.filter} todo{this.props.filteredTodos.length !== 1 ? 's' : ''}
                        </Text>
                    </View>

                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />

                    <TouchableHighlight
                        onPress={this.props.onAddStarted}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Add one
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={this.props.onShowTodoFrontPage}
                        style={[styles.button, styles.backgroundColorRed]}
                    >
                        <Text style={styles.buttonText}>
                            back
                        </Text>
                    </TouchableHighlight>
                </View>
        );
    }
}

TaskList.propTypes = {
    filter: React.PropTypes.string.isRequired,
    filteredTodos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onAddStarted: React.PropTypes.func.isRequired,
    onDone: React.PropTypes.func.isRequired,
    isImportant: React.PropTypes.func.isRequired,
    onToggle: React.PropTypes.func.isRequired,
    onShowTodoFrontPage: React.PropTypes.func.isRequired,
    styles: React.PropTypes.func.isRequired,
};

export default TaskList;
