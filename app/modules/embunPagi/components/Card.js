'use strict';


import React, { PureComponent } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Divider, Button, Grid, Row, Col } from 'react-native-elements';

import * as configs from '../../../constants/configs';

class Card extends PureComponent {

    constructor(props) {
        super(props);
    } 

    /*
    shouldComponentUpdate(nextProps, nextState) {
        return false
    }
    */

    render() {

        const { data } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.textTitle}>{data.title}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.textDate}>{data.tanggal}</Text>
                </View>
                <Divider style={{ backgroundColor: '#EEEEEE' }} />
                <View style={styles.contentContainer}>
                    <Text style={styles.textContent}>{data.excerpt}</Text>
                </View>
                <View style={styles.actionContainer}>
                    <Grid>
                        <Row>
                            <Col>
                                <TouchableHighlight activeOpacity={0.5} underlayColor="transparent" onPress={this.props.onShare}>
                                    <View style={[styles.btnContainer,{borderColor: '#EEEEEE',borderLeftWidth: 1}]}>
                                        <Icon 
                                          name="share" 
                                          size={25} 
                                          color={configs.color.themes.primary}/>
                                        <Text style={styles.textIcon}>SHARE</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                            <Col>
                                <TouchableHighlight activeOpacity={0.5} underlayColor="transparent" onPress={this.props.onPress}>
                                    <View style={[styles.btnContainer,{borderColor: '#EEEEEE',borderLeftWidth: 1}]}>
                                        <Icon 
                                          name="remove-red-eye" 
                                          size={25} 
                                          color={configs.color.themes.accent}/>
                                        <Text style={styles.textIcon}>BACA</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                        </Row>
                    </Grid>
                </View>
            </View>
            
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.5,
        borderColor: '#EEEEEE',
        borderRadius: 1
    },
    titleContainer: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    dateContainer: {
        flex: 1,
        marginTop: 5,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    contentContainer: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    actionContainer: {
        borderTopWidth: 1,
        borderColor: '#EEEEEE',
        backgroundColor: '#FFFFFF',
        height: 50,
        marginTop: 30
    },
    btnContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 20,
        textAlign: 'justify',
        color: configs.color.font.dark,
        fontWeight: 'bold'
    },
    textDate: {
        fontSize: 16,
        textAlign: 'left',
        color: configs.color.font.secondary,
        //fontWeight: 'bold'
    },
    textContent: {
        fontSize: 16,
        textAlign: 'justify',
        color: configs.color.font.dark,
        lineHeight: 30
    },
    textIcon: {
        fontSize: 12,
        color: configs.color.font.dark
    }
});


export default Card;










