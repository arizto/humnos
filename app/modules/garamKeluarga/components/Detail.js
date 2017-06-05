'use strict';

import React, { PureComponent } from 'react';
import { InteractionManager, View, ScrollView, Text, TouchableHighlight, Share, BackHandler, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Divider, Grid, Row, Col } from 'react-native-elements'
import immutable from 'immutable';
import { NavigationActions } from 'react-navigation'

import * as configs from '../../../constants/configs';

import Close from '../../../components/icons/Close';
import HeaderTitle from '../../../components/HeaderTitle';


class Detail extends PureComponent {

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
            headerRight: (
                <Close onPress={goBack} color={configs.color.font.accent}/>
            )
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            loading2: false,
            fontSize: 20
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

    onShare(item) {
        this.setState({loading2: true})

        Share.share({
            message: item.content,
            title: item.title
        }, {
            dialogTitle: 'Share Garam Keluarga',
            tintColor: configs.color.font.dark
        })
        .then(this.setState({loading2: false}))
        .catch((error) => this.setState({loading2: false}));
    }

    handleZoomIn() {
        if( this.state.fontSize >= 22 )
            return false
        requestAnimationFrame(() => {
            this.setState( { fontSize: this.state.fontSize + 1 } );
        });
    }

    handleZoomOut() {
        if( this.state.fontSize <= 20 )
            return false
        requestAnimationFrame(() => {
            this.setState( { fontSize: this.state.fontSize - 1 } );
        });
    }

    renderLoading() {
        if( this.state.loading2 )
        {
            return (
                <View  style={configs.styles.loadingContainer}>
                  <ActivityIndicator size="large" style={[ configs.styles.center, configs.styles.large]} color={'grey'}/>
                </View>
            );
          
        }
    }


    render() {

        const { item } = this.props.navigation.state.params;

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
                            <Col>
                                <TouchableHighlight activeOpacity={0.5} underlayColor="transparent" onPress={() => this.onShare(item)}>
                                    <View style={styles.btnContainer}>
                                        <Icon 
                                          name="share" 
                                          size={25} 
                                          color={configs.color.font.accent}/>
                                        <Text style={styles.textIcon}>SHARE</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                        </Row>
                    </Grid>
                </View>
                <ScrollView>
                    <View style={styles.card}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.textTitle}>{item.title}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.textDate}>{item.tanggal}</Text>
                        </View>
                        <Divider style={{ backgroundColor: configs.color.font.dark }} />
                        {
                            ( item.verse && item.verse !== '' ) ? 
                            <View>
                                <View style={styles.verseContainer}>
                                    <Text style={[styles.textVerse, {fontSize: this.state.fontSize}]}>{item.verse}</Text>
                                </View>
                                <Divider style={{ backgroundColor: configs.color.font.dark }} />
                            </View>
                            :
                            <View/>
                        }
                        <View style={styles.contentContainer}>
                            <Text style={[styles.textContent, {fontSize: this.state.fontSize}]}>{item.content}</Text>
                        </View>
                    </View>
                </ScrollView>
                {this.renderLoading()}
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
    card: {
        margin: 5,
        minHeight: configs.dimension.height - 85,
        backgroundColor: '#FFFFFF',
        paddingLeft: 20,
        paddingRight: 20
    },
    titleContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateContainer: {
        marginTop: 5,
        marginBottom: 10,
    },
    verseContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    contentContainer: {
        marginTop: 10,
        marginBottom: 50
    },
    textTitle: {
        fontSize: 22,
        textAlign: 'left',
        color: configs.color.font.dark
    },
    textDate: {
        fontSize: 16,
        textAlign: 'left',
        color: configs.color.font.secondary
    },
    textVerse: {
        textAlign: 'justify',
        fontStyle: 'italic',
        color: configs.color.font.dark,
        lineHeight: 35
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












