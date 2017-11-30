import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    WebView,
    StatusBar,
    Text,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { getMarketData, getChartData, getPrice } from '../../shared/actions/marketData';
import { setBalance, setFirstUse } from '../../shared/actions/account';
import { setSetting } from '../../shared/actions/tempAccount';
import { changeHomeScreenRoute } from '../../shared/actions/home';
import { Navigation } from 'react-native-navigation';
import Home from './home';
import IotaSpin from '../components/iotaSpin';

const width = Dimensions.get('window').width;
const height = global.height;
const logoSpin = require('../logo-spin/logo-spin-glow.html');

class Loading extends Component {
    componentDidMount() {
        this.props.changeHomeScreenRoute('balance');
        this.props.setSetting('mainSettings');
    }

    componentWillReceiveProps(newProps) {

      const ready = !this.props.tempAccount.ready && newProps.tempAccount.ready;
      if (ready) {
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'home',
                    navigatorStyle: {
                        navBarHidden: true,
                        navBarTransparent: true,
                        screenBackgroundImageName: 'bg-blue.png',
                        screenBackgroundColor: '#102e36',
                    },
                    overrideBackPress: true,
                },
            });
      }
    }

    render() {
        const { tempAccount: { ready }, account: { firstUse }, navigator } = this.props;

        if (this.props.account.firstUse) {
            return (
                <ImageBackground source={require('../../shared/images/bg-blue.png')} style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.infoText}>Loading seed for the first time.</Text>
                        <Text style={styles.infoText}>This may take a while.</Text>
                        <Text style={styles.infoText}>You may notice your device slowing down.</Text>
                        <ActivityIndicator
                            animating={true}
                            style={styles.activityIndicator}
                            size="large"
                            color="#F7D002"
                        />
                    </View>
                    <View style={{ flex: 1 }} />
                </ImageBackground>
            );
        } else if (!this.props.account.firstUse) {
            return (
                <ImageBackground source={require('../../shared/images/bg-blue.png')} style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <IotaSpin duration={3000} />
                </ImageBackground>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        color: 'white',
        fontFamily: 'Lato-Light',
        fontSize: width / 23,
        backgroundColor: 'transparent',
        paddingTop: height / 30,
        textAlign: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: height / 40,
    },
});

const mapStateToProps = state => ({
    marketData: state.marketData,
    tempAccount: state.tempAccount,
    account: state.account,
});

const mapDispatchToProps = dispatch => ({
    setBalance: addressesWithBalance => {
        dispatch(setBalance(addressesWithBalance));
    },
    setFirstUse: boolean => {
        dispatch(setFirstUse(boolean));
    },
    changeHomeScreenRoute: route => dispatch(changeHomeScreenRoute(route)),
    setSetting: setting => dispatch(setSetting(setting)),
});

Loading.propTypes = {
    marketData: PropTypes.object.isRequired,
    tempAccount: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
