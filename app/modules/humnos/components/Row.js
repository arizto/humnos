'use strict';


import React, { PureComponent } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Row extends PureComponent {

    constructor(props) {
        super(props);
    } 

    

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }
    

    render() {

        var background = ( this.props.background ) ? this.props.background : '#EEEEEE';

        return (
            <TouchableHighlight underlayColor="transparent" onPress={this.props.onPress}>
                <View style={[styles.container,{ backgroundColor: background }]}>
                    <View style={styles.noContainer}>
                        <Text style={[styles.text,styles.no]}>{this.props.data.no}.</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{this.props.data.title}</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Icon name="ios-arrow-dropright-outline" size={30} style={styles.arrow} />
                    </View>
                </View>
            </TouchableHighlight>
        );


    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.5,
        borderColor: '#BDBDBD',
        borderRadius: 1,
        overflow: 'hidden'
    },
    noContainer: {
        flex: 0.15,
        justifyContent: 'center',
    },
    titleContainer: {
        flex: 0.65,
        justifyContent: 'center'
    },
    arrowContainer: {
        flex: 0.2,
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: '#455A64'
    },
    no: {
        textAlign: 'left',
        marginLeft: 5
    },
    arrow: {
        color: '#0277BD',
        textAlign: 'right',
        marginRight: 10
    }
});


export default Row;










