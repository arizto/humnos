'use strict';

import React, { Component } from 'react';
import { InteractionManager, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import immutable from 'immutable';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';

import { connect } from 'react-redux';
import * as actions from '../actions'

import * as configs from '../../../constants/configs';

class Lists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }

    }

    componentDidMount() {
        //console.log('list announcements mount')
        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                this.setState({loading: false});
            }, 10)
        })
        
    }
        
    shouldComponentUpdate(nextProps, nextState) {
        if( !nextState.loading  ) {
            return true
        }
        return false
    }

    render() {

        if( !this.state.loading )
        {   
            
            var announcements = this.props.announcements.get('lists').toArray();

            if( announcements.length > 0 )
            {
                return (
                    
                    <Swiper dotColor={'white'} 
                        activeDotColor={configs.color.themes.accent_secondary} 
                        height={250} horizontal={true} 
                        paginationStyle={{
                            bottom: 10
                        }} 
                        loop={true}>
                        { 
                            announcements.map((item,i) => {
                                var style = ( i % 2 === 0  ) ? styles.odd : styles.even
                                var color = ( i % 2 === 0  ) ? configs.color.themes.dark : configs.color.themes.accent
                                //console.log(styles.odd)
                                return (
                                    <View key={i} style={style}>
                                        <Text style={styles.textHeading}>PENGUMUMAN</Text>
                                        <View style={styles.contentContainer}>
                                            <Text style={styles.textContent}>{item.excerpt}</Text>
                                        </View>
                                        <View style={styles.btnContainer}>
                                            <Button title='SELENGKAPNYA' onPress={() => this.props.onPress('Announcement',item)} backgroundColor={color} />
                                        </View>
        
                                    </View>
                                )
                            }) 
                        }
                    </Swiper>
                    
                )
            }
            
            return (
                <View style={styles.container}>
                    <View style={styles.odd} />
                </View>
            )

        }
        
        return (
            <View style={configs.styles.center}>
                <ActivityIndicator size="small" style={[configs.styles.center, configs.styles.large]} />
            </View>
        );
        

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    odd: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: configs.color.themes.accent
    },
    even: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: configs.color.themes.light
    },
    textHeading: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: configs.color.font.primary,
        marginTop: 5
    },
    textContent: {
        fontSize: 14,
        textAlign: 'justify',
        color: configs.color.font.primary,
        lineHeight: 30,
        height: 100,
        overflow: 'hidden'
    },
    contentContainer: {
        marginTop: 5
    },
    btnContainer: {
        marginTop: 30
    }
});

export default connect(state => ({
    announcements: state.get('announcements')
})
)(Lists);












