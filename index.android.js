/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Button,
  BackHandler,
  ToolbarAndroid,
  View
} from 'react-native';

import ImagePicker from './src/native_modules'
import SimpleModule from './src/simple_module'
import Second from './src/second'
import Splash from './src/splash'

import './src/config/server'

const API_LOGIN = 'LogOnService.ashx';
const API_BASE = 'http://60.191.40.2:6999/IAPP/API/';

export default class RNapp extends Component {
  constructor(props) {
    super(props);
    this.state={u_name: '', passwd: ''};
  }

  componentWillMount() {
    console.log('Component will mount');
    BackHandler.addEventListener('hardwareBackPress', this._onBackPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._destroy)
  }

  _destroy = () => {
    console.log('Destroy component');
  };

  _showMain = () => {
    this.setState({showSecond: false});
  };

  _showSecond = () => {
    this.setState({showSecond: true})
  };

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  _onBackPressed = () => {
    console.log('On back pressed');
    this._showMain();
    return true
  };

  loginServer = () => {
    console.log('login with: ',
      'user name: ', this.state.u_name,
      'password: ', this.state.passwd);

    fetch(API_BASE + API_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'UserId': this.state.u_name,
      },
      body: 'UserCode=' + this.state.u_name + '&OpType=UserLoginOn&SysPinPM=QF&Password=' + this.state.passwd})
      .then((response)=>{
      // console.log('Raw response: ', response.text())
      response.json()
    })
      .then((resJson) => {this._showSecond()})
      .catch((e) => {console.log(e)})
  };

  render() {
    if(this.state.showSecond) {
      return(
        <View style={{flex: 1}}>
          <ToolbarAndroid
            navIcon={{uri: 'ic_arrow_back_black_24dp'}}
            onIconClicked={()=>{this._showMain()}}
            style={styles.toolbar}/>
          <Splash type={0} style={{flex: 1, backgroundColor: 'yellow'}}/>
        </View>
      )
    }
    return (
      <View style={[styles.container,]}>
        {/*logo*/}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: 'ic_launcher'}}
            style={{width: 100, height: 100}}/>
        </View>
        {/*输入部分*/}
        <View style={{marginVertical: 24, padding: 16, borderRadius: 4, borderWidth: 2, borderColor: 'grey'}}>
          <TextInput
            ref="1"
            onSubmitEditing={()=>{this.focusNextField('2')}}
            onChangeText={(text) => {this.setState({u_name: text});}}
            returnKeyType={'next'}
            keyboardType={'numeric'}
            placeholder={'user name'}/>
          <TextInput
            ref="2"
            secureTextEntry={true}
            onChangeText={(text) => {this.setState({passwd: text});}}
            returnKeyType={'done'}
            keyboardType={'default'}
            selectTextOnFocus={true}
            placeholder={'password'}/>
        </View>

        <Button
          title="登录" onPress={this.loginServer}/>

        <Button title="PickImage"
                onPress={()=>{
                  AppRegistry.registerComponent('SimpleModule', () => Second)
                  AppRegistry.runApplication("SimpleModule", {rootTag: 'SimpleModule'})
                  SimpleModule.navTo('SimpleModule');
                  // ImagePicker.pickImage()
                  //   .then((path)=>{console.log('Selected path: ', path)})
                  //   .catch((e)=>{console.log(e)})
                }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  toolbar: {
    backgroundColor: '#E9EAED',
    height: 56,
  },
});

AppRegistry.registerComponent('RNapp', () => RNapp);
