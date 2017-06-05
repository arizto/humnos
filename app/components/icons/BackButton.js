import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableHighlight, InteractionManager } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import * as configs from '../../constants/configs'

export default class BackButton extends PureComponent {

  constructor(props) {
    super(props);
    
  }

  onPress() {

    InteractionManager.runAfterInteractions(() => {
        this.props.onPress();
    });
  
  }

  render() {
    return (
      <TouchableHighlight activeOpacity={0.5} underlayColor="transparent" onPress={ () => this.onPress() }>
        <View style={styles.container}>
            <Icon 
              name="ios-arrow-back" 
              size={35} 
              color={this.props.color ? this.props.color : '#FFFFFF'}/>
        </View>
      </TouchableHighlight>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  backButton: {
    width: 15,
    height: 15,
  }
});
