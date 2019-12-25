/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import  { VlcSimplePlayer } from 'react-native-yz-vlcplayer';
import { withContext } from '../ContextManage';
import Orientation from 'react-native-orientation'
let deviceHeight = Dimensions.get('window').height;

type Props = {};
class Video extends Component<Props> {

  constructor(props){
    super(props);
    this.interval = null;
    this.scrollRef = null;
    this.top = true;
    this.y = 100;
  }

  state = {
    isFull:false,
    isScroll: false,
  };

  componentDidMount(){
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  autoScroll=()=>{
    let { isFull } = this.state;
    let y = deviceHeight / 5;
    if(this.top){
      this.y += y;
    }else{
      this.y -= y;
    }
    if(this.y >=  deviceHeight){
      this.y = deviceHeight;
      this.top = false;
    }
    if(this.y <= 0){
      this.y = 0;
      this.top = true;
    }
    if(!isFull){
      this.scrollRef.scrollTo({x:0,y:this.y,animated:true});
    }
  }

  closeAuto = ()=> {
    if(this.state.isScroll){
      clearInterval(this.interval);
      this.setState({
        isScroll: false
      });
    }else{
      this.interval = setInterval(this.autoScroll,8000);
      this.setState({
        isScroll: true
      });
    }
  }

  onStartFullScreen = ()=>{
    this.setState({
      isFull:true,
    })
  }

  onCloseFullScreen = ()=>{
    this.setState({
      isFull:false,
    })
  }



  render() {
    let { navigation } = this.props;
    let { isFull } = this.state;
    return (
      <View  style={[styles.container,{marginTop: isFull ? 0 :  40 }]}>
        <VlcSimplePlayer
          style={{width:'80%'}}
          url={"rtsp://admin:qweasd234@192.168.44.228:7001/eec330ae-8e56-4a68-e874-b7d353b86db0"}
          //Orientation={Orientation}
          onStartFullScreen={this.onStartFullScreen}
          onCloseFullScreen={this.onCloseFullScreen}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

Video = withContext(Video);

export default  Video;
