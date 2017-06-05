'use strict';

import React, { Component } from 'react'; 
import { View, Text, StyleSheet, Platform, StatusBar, InteractionManager } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator } from 'react-navigation';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as configs from './constants/configs';

import SplashScreen from '@remobile/react-native-splashscreen';

import Router from 'react-native-simple-router';
import HeaderTitle from './components/HeaderTitle';
import humnos from './modules/humnos';
import announcements from './modules/announcements';
import garamKeluarga from './modules/garamKeluarga';
import embunPagi from './modules/embunPagi';
import Home from './components/Home';
import Info from './components/Info';


class App extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            update: true
        }

    }
  
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.actions.humnos.getLagu();
            this.props.actions.announcements.gets();
            this.props.actions.garamKeluarga.gets(true);
            this.props.actions.embunPagi.gets(true);
        });
    }

    componentWillReceiveProps(nextProps) {

        if( nextProps.humnos.get('status') === 'GET_LIST_DONE' && nextProps.announcements.get('status') === 'GET_LIST_DONE' && nextProps.garamKeluarga.get('status') === 'GET_LIST_DONE' && nextProps.embunPagi.get('status') === 'GET_LIST_DONE'  ) {
            InteractionManager.runAfterInteractions(() => {
                this.props.actions.humnos.setIdle();
                this.props.actions.announcements.setIdle();
                this.props.actions.garamKeluarga.setIdle();
                this.props.actions.embunPagi.setIdle();
                //requestAnimationFrame(() => {
                    this.setState({loading: false});
                    SplashScreen.hide();
                //})
                
            })
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        if( !nextState.loading && nextState.update  ) {
            this.setState({update: false});
            return true
        }
        return false
    }

    render() {

        const MainScreenNavigator = TabNavigator({
            Home: { 
                screen: Home, 
                navigationOptions: {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="ios-home-outline" size={20} style={[styles.icon, {color: tintColor}]} />
                    ),
                } 
            },
            About: { 
                screen: Info, 
                navigationOptions: {
                    tabBarLabel: 'About',
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="ios-information-circle-outline" size={20} style={[styles.icon, {color: tintColor}]} />
                    ),
                } 
            }
        },{
            initialRouteName: 'Home',
            swipeEnabled: false,
            tabBarOptions: {
                activeTintColor: configs.color.font.accent,
                inactiveTintColor: configs.color.font.primary,
                showIcon: true,
                tabStyle: {
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                labelStyle: {
                    marginTop: 0,
                    fontSize: 11
                },
                indicatorStyle: {
                    backgroundColor: 'transparent'
                },
                style: {
                    height: 50,
                    backgroundColor: configs.color.themes.primary,
                    justifyContent: 'center'
                }
            },
        });
        

        const HumnosApp = StackNavigator({
            Main: { 
                screen: MainScreenNavigator,
                navigationOptions: {
                    headerTitle: (
                        <HeaderTitle title="HUMNOS" />
                    ),
                    headerStyle: {
                        backgroundColor: configs.color.themes.primary,
                        paddingTop: 0,
                        height: 50
                    }
                } 
            },
            Announcement: { 
                screen: announcements.components.Detail,
                navigationOptions: {
                    headerTitle: (
                        <HeaderTitle title="PENGUMUMAN" headerLeftRight={true} />
                    ),
                    headerLeft: (
                        <View />
                    ),
                    headerStyle: {
                        backgroundColor: configs.color.themes.primary,
                        paddingTop: 0,
                        height: 50
                    }
                } 
            },
            Humnos: { 
                screen: humnos.components.Lists,
                navigationOptions: {
                    headerTitle: (
                        <HeaderTitle title="HUMNOS" headerLeftRight={true} />
                    ),
                    headerStyle: {
                        backgroundColor: configs.color.themes.primary,
                        paddingTop: 0,
                        height: 50
                    }
                } 
            },
            HumnosDetail: { 
                screen: humnos.components.Detail,
                navigationOptions: {
                    headerLeft: (
                        <View />
                    ),
                    headerStyle: {
                        backgroundColor: configs.color.themes.primary,
                        paddingTop: 0,
                        height: 50
                    }
                } 
            },
            GaramKeluarga: { 
                screen: garamKeluarga.components.Lists,
                navigationOptions: {
                    headerTitle: (
                        <HeaderTitle title="Garam Keluarga" headerLeftRight={true} />
                    ),
                    headerStyle: {
                        backgroundColor: configs.color.themes.primary,
                        paddingTop: 0,
                        height: 50
                    }
                } 
            },
            GaramDetail: { 
                screen: garamKeluarga.components.Detail,
                navigationOptions: {
                    headerTitle: (
                        <HeaderTitle title="Garam Keluarga" headerLeftRight={true} />
                    ),
                    headerLeft: (
                        <View />
                    ),
                    headerStyle: {
                        backgroundColor: configs.color.themes.primary,
                        paddingTop: 0,
                        height: 50
                    }
                } 
            },
            EmbunPagi: { 
                screen: embunPagi.components.Lists,
                navigationOptions: {
                    headerTitle: (
                        <HeaderTitle title="Embun Pagi" headerLeftRight={true} />
                    ),
                    headerStyle: {
                        backgroundColor: configs.color.themes.primary,
                        paddingTop: 0,
                        height: 50
                    }
                } 
            },
            EmbunDetail: { 
                screen: embunPagi.components.Detail,
                navigationOptions: {
                    headerTitle: (
                        <HeaderTitle title="Embun Pagi" headerLeftRight={true} />
                    ),
                    headerLeft: (
                        <View />
                    ),
                    headerStyle: {
                        backgroundColor: configs.color.themes.primary,
                        paddingTop: 0,
                        height: 50
                    }
                } 
            }
        });

        if( !this.state.loading ) {
            return (
                <View style={styles.container}>
                     <StatusBar
                         backgroundColor={configs.color.themes.dark}
                         barStyle="light-content"/>
                    <HumnosApp/>
                </View>
            );
        }

        return <View />
    
    }

};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#E0E0E0'
  }
});


export default connect(state => ({
    humnos: state.get('humnos'),
    announcements: state.get('announcements'),
    garamKeluarga: state.get('garamKeluarga'),
    embunPagi: state.get('embunPagi')
}),
(dispatch) => ({
    actions: {
        humnos: bindActionCreators(humnos.actions, dispatch),
        announcements: bindActionCreators(announcements.actions, dispatch),
        garamKeluarga: bindActionCreators(garamKeluarga.actions, dispatch),
        embunPagi: bindActionCreators(embunPagi.actions, dispatch)
    }
})
)(App);




