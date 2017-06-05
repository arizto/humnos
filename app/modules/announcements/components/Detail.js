'use strict';

import React, { PureComponent } from 'react';
import { View, ScrollView, Text, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Tabs, Tab } from 'react-native-elements'
import ParsedText from 'react-native-parsed-text';
import immutable from 'immutable';

import * as configs from '../../../constants/configs';
import Close from '../../../components/icons/Close';

class Detail extends PureComponent {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Close onPress={() => navigation.goBack()} color={configs.color.font.accent}/>
            ),
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillUnmount(){
        this.props.navigation.state.params.routes.actions.setStatus('IDLE')
    }

    handlePress(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                return false
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => {return false});
    }

    render() {

        const { item } = this.props.navigation.state.params;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentContainer}>
                    <ParsedText
                        style={styles.textContent}
                        selectable={true}
                        parse={
                            [
                              {type: 'url', style: styles.textParsed, onPress: this.handlePress},
                              {type: 'phone', style: styles.textParsed, onPress: this.handlePress},
                              {type: 'email', style: styles.textParsed, onPress: this.handlePress},
                            ]
                        }
                          childrenProps={{allowFontScaling: false}}>
                          {item.content}
                     </ParsedText>
                </View>
            </ScrollView>
        )

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#E0E0E0'
    },
    contentContainer: {
        flex: 1,
        minHeight: configs.dimension.height - 85,
        margin: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 2,
        alignItems: 'center'
    },
    textContent: {
        textAlign: 'justify',
        color: configs.color.font.dark,
        fontSize: 20,
        lineHeight: 35
    },
    textParsed: {
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        color: configs.color.font.secondary,
        lineHeight: 35
    }
});

export default Detail












