'use strict';

import React, { Component } from 'react';
import { InteractionManager, View, ScrollView, Text, TouchableHighlight, BackHandler, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Divider, Grid, Row, Col } from 'react-native-elements'
import immutable from 'immutable';
import { NavigationActions } from 'react-navigation'

import * as configs from '../../../constants/configs';

import Close from '../../../components/icons/Close';
import HeaderTitle from '../../../components/HeaderTitle';


class Detail extends Component {

    static navigationOptions = ({ navigation }) => {

        const setParamsAction = NavigationActions.setParams({
              params: { from: 'Detail' },
              key: navigation.state.params.key,
        });

        const goBack = () => {
            navigation.dispatch(setParamsAction)
            navigation.goBack()
        }

        return {
            headerTitle: (
                <HeaderTitle title={`HUMNOS ${navigation.state.params.item.no}`} headerLeftRight={true} />
            ),
            headerRight: (
                <Close onPress={goBack} color={configs.color.font.accent}/>
            ),
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            fontSize: 18
        }

        this.onBack = this.onBack.bind(this)

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBack)
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBack)
    }

    onBack() {

        const { navigation } = this.props 

        const setParamsAction = NavigationActions.setParams({
              params: { from: 'Detail' },
              key: navigation.state.params.key,
        });

        navigation.dispatch(setParamsAction)
        navigation.goBack()

        return true
    }

    handleZoomIn() {
        if( this.state.fontSize >= 22 )
            return false
        requestAnimationFrame(() => {
            this.setState( { fontSize: this.state.fontSize + 1 } );
        });
    }

    handleZoomOut() {
        if( this.state.fontSize <= 18 )
            return false
        requestAnimationFrame(() => {
            this.setState( { fontSize: this.state.fontSize - 1 } );
        });
    }

    handleNot() {
        return false;
    }


    render() {

        const { item } = this.props.navigation.state.params;
        const { fontSize } = this.state;

        return (

            <View style={styles.container}>
                <View style={styles.toolbarContainer}>
                    <Grid>
                        <Row>
                            <Col>
                                <TouchableHighlight activeOpacity={0.5} underlayColor="transparent" onPress={ () => this.handleZoomIn() }>
                                    <View style={styles.btnContainer}>
                                        <Icon 
                                          name="zoom-in" 
                                          size={25} 
                                          color={configs.color.font.accent}/>
                                        <Text style={styles.textIcon}>PERBESAR</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                            <Col>
                                <TouchableHighlight activeOpacity={0.5} underlayColor="transparent" onPress={ () => this.handleZoomOut() }>
                                    <View style={styles.btnContainer}>
                                        <Icon 
                                          name="zoom-out" 
                                          size={25} 
                                          color={configs.color.font.accent}/>
                                        <Text style={styles.textIcon}>PERKECIL</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                        </Row>
                    </Grid>
                </View>
                <ScrollView>
                    <View style={styles.card}>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.textTitle,{textAlign: 'center'}]}>{item.title}</Text>
                        </View>
                        <Divider style={{ backgroundColor: configs.color.font.dark }} />
                        <View style={styles.contentContainer}>
                            <Text style={[styles.textContent, {fontSize: this.state.fontSize }]}>{item.content}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>

        )
                    
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#E0E0E0'
    },
    toolbarContainer: {
        height: 50,
        backgroundColor: configs.color.themes.primary
    },
    btnContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        margin: 5,
        minHeight: configs.dimension.height - 85,
        backgroundColor: '#FFFFFF',
        paddingLeft: 20,
        paddingRight: 20
    },
    titleContainer: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    textTitle: {
        fontSize: 22,
        textAlign: 'center',
        color: configs.color.font.dark
    },
    textContent: {
        textAlign: 'justify',
        color: configs.color.font.dark,
        lineHeight: 35
    },
    textIcon: {
        fontSize: 12,
        color: configs.color.font.primary
    }
});

export default Detail;












