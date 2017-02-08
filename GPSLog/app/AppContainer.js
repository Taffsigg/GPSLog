'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import Home from './containers/Home';
import * as appActions from './actions/appActions';
import { connect } from 'react-redux';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { state, actions } = this.props;
        return (

            <Home
                state={state}
                {...actions} />
        );
    }
}

export default connect(state => ({
        state: state
    }),
    (dispatch) => ({
        actions: bindActionCreators(appActions, dispatch)
    })
)(AppContainer);