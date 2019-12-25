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
import Orientation from 'react-native-orientation'
let deviceHeight = Dimensions.get('window').height;
import Http from './app/utils/Http';
type Props = {};
export default class App extends Component<Props> {

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
    // this.interval = setInterval(this.autoScroll,5000);
    Http.get('http://open.douyucdn.cn/api/RoomApi/live/DOTA2')
      .then(data=>{
        console.log(data)
      }).catch(e=>{
        console.log(e)
      })
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
    let { isFull } = this.state;
    return (
      <View  style={[styles.container,{marginTop: isFull ? 0 :  40 }]}>
        <Text style={{marginTop:20}}>rtsp</Text>
        <VlcSimplePlayer
          style={{width:'80%'}}
          url={"rtsp://192.168.44.228:7001/"}
          //Orientation={Orientation}
          onStartFullScreen={this.onStartFullScreen}
          onCloseFullScreen={this.onCloseFullScreen}
        />

        <View style={{height:100,width:'100%'}}/>
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
