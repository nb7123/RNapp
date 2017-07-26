/**
 * Created by michael on 17-7-25.
 */

import React, {Component} from 'react';

import {
  AppRegistry,
  Button,
  View,
  Text,
} from 'react-native';

export default class SimpleModule extends Component {
  render() {
    return(
      <View style={this.props.style}>
        <Text>This is a simple module</Text>
      </View>
    )
  }
}