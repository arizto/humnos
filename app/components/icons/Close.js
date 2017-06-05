import React, { PureComponent } from 'react'; 
import { View, StyleSheet, TouchableHighlight, InteractionManager } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


class Close extends PureComponent {

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
      <TouchableHighlight style={styles.iconContainer} activeOpacity={0.5} underlayColor="transparent" onPress={ () => this.onPress() }>
        <View>
          <Icon
            name="ios-close"
            color={this.props.color ? this.props.color : '#FFFFFF'}
            size={40}
            style={styles.icon}/>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  iconContainer: {
    padding: 15
  },
  icon: {
    marginLeft: 8,
  }
};



export default Close;



