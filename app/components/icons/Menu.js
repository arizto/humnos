import React, { Component, PropTypes } from 'react'; 
import { View, StyleSheet, TouchableHighlight, InteractionManager, Image, Navigator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import LeftNav from '../nav/LeftNav';


class Menu extends Component {

  constructor(props) {
    super(props);
    
  }

  openMenu() {
    
    requestAnimationFrame( () => {
      var route = {
        name: 'Menu',
        component: LeftNav,
        sceneConfig: Navigator.SceneConfigs.FloatFromLeft
      };

      if( !this.props.toRoute )
      {
          this.props.navigator.onForward(route,this.props.navigator.refs.navigator);
          return
      }

      this.props.toRoute(route);
      
    });
      
  
  }

  render() {

    return (
      <TouchableHighlight style={styles.iconContainer} underlayColor="transparent" onPress={ () => this.openMenu() }>
        <View>
          <Icon
            name="ios-menu"
            color="#FFFFFF"
            size={35}
            style={styles.icon}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  iconContainer: {
    padding: 10
  },
  icon: {
    marginLeft: 8,
  }
};



export default Menu;



