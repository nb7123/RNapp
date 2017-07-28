/**
 * Created by michael on 17-7-25.
 */

import React, {Component} from 'react';

import {
  AppRegistry,
  Animated,
  Button,
  Dimensions,
  View,
  Text,
} from 'react-native';

export default class SimpleModule extends Component {
  constructor(props) {
    super(props);
    var {height, width} = Dimensions.get('window');
    this.state = {left: 0, showNext: false};
  }

  componentDidMount() {
    // Animated.timing(this.state.left, {toValue: 0}).start()
  }
  render() {
    if (this.state.showNext) {
      return(
        <View style={[this.props.style, {backgroundColor: 'black'}]}>
        <Button title="Change" onPress={()=>{this.setState({showNext: false})}}/>
        </View>
      );
    }
    return(
      <View style={[this.props.style, {left: this.state.left, backgroundColor: 'yellow'}]}>
        <Text>This is a simple module</Text>
        <Button title="Press me" onPress={()=>{
          this.setState(pre=>{return {showNext: !pre.showNext}})}
        }/>
      </View>
    );
  }
}