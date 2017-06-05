import React, { Component, PropTypes } from 'react'; 
import { InteractionManager, TouchableHighlight, Navigator, BackAndroid,ScrollView, View, Text, Image, Platform, ActivityIndicator, ActivityIndicatorIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import * as configs from '../constants/configs';

import lagu from '../modules/lagu'


const propTypes = {
  toRoute: PropTypes.func.isRequired,
  data: PropTypes.object
};



class LeftNav extends Component {


    constructor(props) {
        super(props);

        this.changeScene = this.changeScene.bind(this);
        
        
    }

    componentWillReceiveProps(nextProps) {
        
        
    }

    quit() {
        BackAndroid.exitApp();
    }


    changeScene(component, name) {

        requestAnimationFrame(() => {

            var props = {};

            var route = {
              name: name,
              component: component,
              passProps: props,
            };
            

            this.props.toRoute(route);
            
        });
        

    };


    render() {


        return (

                <ScrollView style={styles.container}>

                    <TouchableHighlight underlayColor="transparent" onPress={() => this.changeScene(lagu.Lists, 'Test') } >
                        <View style={styles.menu}>
                            <Icon name="ios-checkbox"
                                  size={35}
                                  color="#000000"
                                  style={styles.icons}/>
                            <Text style={styles.textMenu}>Test</Text>
                        </View>
                    </TouchableHighlight>

                    <View style={{paddingBottom: 100}}/>

                </ScrollView>

        );

    }
}


const styles = {
    container: {
        flex: 1,
        //height: config.dimension.height
    },
    header: {
        paddingTop: 16,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FAFAFA'
    },
    menu: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FAFAFA'
    },
    icons: {
        marginRight: 10,
        marginLeft: 10,
    },
    textHeader: {
        fontSize: 16
    },
    textMenu: {
        fontSize: 18,
        marginTop: 6
    }
};

LeftNav.propTypes = propTypes

export default LeftNav;





