/**
 * Created by michael on 17-7-28.
 */

'use strict';

import React, {Component} from 'react'
import {
  ProgressBarAndroid,
  Button,
  Text,
  TouchableNativeFeedback,
  ViewPagerAndroid,
  View,
  Image,
} from 'react-native'

 import SvrConfig from './config/server'

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state={showBreak: false, progress: -1,};
  }

  componentDidMount() {
    this.timer = setTimeout(
      () => {
        this.setState({showBreak: true, progress: 0.2});
        },
      5000
    );

    console.log('Server config: ', SvrConfig.API_BASE);

    // download splash info
    // fetch("")
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  render() {
    var content;
    console.log('View type: ', this.props.type);
    // 视频还是图片
    switch (this.props.type) {
      case 0:
        console.log('View type is: pictures');
        let pics = [
          {key: 'http://apod.nasa.gov/apod/image/1410/20141008tleBaldridge001h990.jpg',},
          {key: 'http://apod.nasa.gov/apod/image/1409/volcanicpillar_vetter_960.jpg',},
          {key: 'http://apod.nasa.gov/apod/image/1409/m27_snyder_960.jpg',},
          {key: 'http://apod.nasa.gov/apod/image/1409/PupAmulti_rot0.jpg',},
          {key: 'http://apod.nasa.gov/apod/image/1510/lunareclipse_27Sep_beletskycrop4.jpg',},
        ];
        var pages=[];
        for (var i = 0; i < pics.length; ++i) {
          pages.push(
            <View style={{flex: 1}}>
            <Image
              style={{flex: 1}}
              source={{uri: pics[i].key}}/>
            </View>
          );
        }

        content = (
          <ViewPagerAndroid
            initialPage={0}
            ref={viewPager => {this.viewPager = viewPager;}}
            style={{flex: 1.0}}>
            {pages}
          </ViewPagerAndroid>);
        break;
      case 1:
        console.log('View type is: video');
        content = (<Image
          style={{flex: 1}}
          source={{uri: 'ic_launcher'}}/>);
        break;
    }

    // break button
    let btnBreak = this.state.showBreak? (
      <View style={{position: 'absolute', right: 20, bottom: 20,}}>
        <Text style={{padding: 4, textAlign: 'center', color: 'red'}}>跳过</Text>
      </View>
    ) : (<View/>);

    // content.props.style.left = 200;
    return(
      <View style={[{flex: 1,}]}>
        <ProgressBarAndroid
          indeterminate={this.state.progress<=0}
          progress={this.state.progress}
          styleAttr={'Horizontal'}/>
        {content}
        <TouchableNativeFeedback
          useForeground={true}
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={()=>{
            if (this.viewPager) {
              this.viewPager.setPage(Math.floor(Math.random()*5));
            }
          }}>
          {btnBreak}
        </TouchableNativeFeedback>
      </View>);
  }
}
