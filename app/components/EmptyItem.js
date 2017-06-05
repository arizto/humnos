import React, { PureComponent } from 'react'; 
import { View, StyleSheet, Text } from 'react-native';

class EmptyItem extends PureComponent {
  render() {
    const styleHeight = this.props.height ? { height: this.props.height } : {}
    return (
      <View style={[styles.container, styles.centerText, styleHeight]}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1    
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#455A64',
  }
});

export default EmptyItem;