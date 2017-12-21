import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { toggleTopBarDisplay } from 'iota-wallet-shared-modules/actions/home';

import withUserActivity from './withUserActivity';
import Balance from '../containers/balance';
import Send from '../containers/send';
import Receive from '../containers/receive';
import History from '../containers/history';
import Settings from '../containers/settings';

const routeToComponent = {
    balance: Balance,
    send: Send,
    receive: Receive,
    history: History,
    settings: Settings,
};

class TabContent extends Component {
    handleCloseTopBar = () => {
        const { isTopBarActive, toggleTopBarDisplay } = this.props;
        if (isTopBarActive) toggleTopBarDisplay();
    };

    render() {
        const { currentRoute, navigator, startBackgroundProcesses, endBackgroundProcesses } = this.props;

        const Content = routeToComponent[currentRoute];

        return (
            <View style={{ flex: 1 }}>
                <Content
                    type={currentRoute}
                    navigator={navigator}
                    closeTopBar={this.handleCloseTopBar}
                    startBackgroundProcesses={currentRoute === 'settings' ? startBackgroundProcesses : null}
                    endBackgroundProcesses={currentRoute === 'settings' ? endBackgroundProcesses : null}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    currentRoute: state.home.childRoute,
    isTopBarActive: state.home.isTopBarActive,
});

const mapDispatchToProps = {
    toggleTopBarDisplay,
};

TabContent.propTypes = {
    navigator: PropTypes.object.isRequired,
    currentRoute: PropTypes.string.isRequired,
    isTopBarActive: PropTypes.bool.isRequired,
    toggleTopBarDisplay: PropTypes.func.isRequired,
    startBackgroundProcesses: PropTypes.func.isRequired,
    endBackgroundProcesses: PropTypes.func.isRequired,
};

export default withUserActivity()(connect(mapStateToProps, mapDispatchToProps)(TabContent));
