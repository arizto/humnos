import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableHighlight, StyleSheet, InteractionManager } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Grid, Row, Col } from 'react-native-elements';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as configs from '../constants/configs';

import announcements from '../modules/announcements';
import routes from '../modules/routes';

class Home extends Component {
     constructor(props) {
        super(props);
        this.state = {
            render: false,
        }

        this.goTo = this.goTo.bind(this)
    }

    goTo(page, item = {}) {
        
        if( this.props.routes.get('status') === 'IDLE' ) {
            this.props.actions.routes.setStatus('BUSY') 
            InteractionManager.runAfterInteractions(() => {
                this.props.navigation.navigate(page, {routes: {state: this.props.routes, actions: this.props.actions.routes}, item: item})
            })
        }
        
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({render: true});
        })
    }

    /*
    shouldComponentUpdate(nextProps, nextState) {
        return false
    }
    */

    render() {
        const { title } = this.props;

        if( this.state.render )
        return (

            <View style={styles.container}>
                <announcements.components.Lists onPress={this.goTo}/>
                <ScrollView style={[styles.container]}>
                    <Grid>
                        <Row>
                            <Col>
                                <TouchableHighlight underlayColor="transparent" onPress={ () => { this.goTo('Humnos') } }>
                                    <View style={styles.colStyle}>
                                        <Icon name="ios-musical-notes" size={40} style={[styles.icon, {color: configs.color.themes.primary}]} />
                                        <Text style={styles.textStyle}>HUMNOS</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                            <Col>
                                <TouchableHighlight underlayColor="transparent" onPress={ () => { this.goTo('GaramKeluarga') } }>
                                    <View style={[styles.colStyle, styles.colCenter]}>
                                        <Icon name="ios-book" size={40} style={[styles.icon, {color: configs.color.themes.accent}]} />
                                        <Text style={styles.textStyle}>GARAM KELUARGA</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                            <Col>
                                <TouchableHighlight underlayColor="transparent" onPress={ () => { this.goTo('EmbunPagi') } }>
                                    <View style={styles.colStyle}>
                                        <Icon name="ios-bookmarks" size={40} style={[styles.icon, {color: configs.color.themes.primary}]} />
                                        <Text style={styles.textStyle}>EMBUN PAGI</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                        </Row>
                    </Grid>
                </ScrollView>
            </View>
        );

        return <View />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#E0E0E0'
    },
    colStyle: {
        flex: 1,
        height: configs.dimension.width / 3, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#FFFFFF',
        borderColor: '#EEEEEE',
        borderBottomWidth: 1
    },
    colCenter: {
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    textStyle: {
        color: configs.color.font.dark,
        marginTop: 10,
        fontSize: 10,
        textAlign: 'center'
    }
});

export default connect(state => ({
    routes: state.get('routes')
}),
(dispatch) => ({
    actions: {
        routes: bindActionCreators(routes.actions, dispatch)
    }
})
)(Home);


