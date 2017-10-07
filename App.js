import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight
 } from 'react-native';

class Cell extends React.Component{//lastfm api, fetch api to replace jquery ajax
  handleTap(){
    console.log('tapped')
  }
  render(){
    return(//cell view with 3 view columns - one for img, one for title&artist content, 1 for caret
      <TouchableHighlight onPress={this.handleTap}>
      <View style={styles.cell}>
          <Image style={styles.imageView} source={{uri:this.props.cellItem.image[3]['#text']}}/>
          <View style={styles.contentView}>
            <Text>{this.props.cellItem.name}</Text>
            <Text>{this.props.cellItem.artist.name}</Text>
          </View>
          <View style={styles.accessoryView}>
            <Text style={styles.textCenter}>></Text>
          </View>
      </View>
      </TouchableHighlight>
    )
  }
}
export default class App extends React.Component {//entry to app with this component - run in command line with npm start

  fetchTopTracks(){//get info asap from api with custom action
    const apiKey = "80b1866e815a8d2ddf83757bd97fdc76"
    const url = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`
    return fetch(url)//returns a promise
    .then(response => response.json())
  }
  //look for fetch polyfill to do ajax calls with less code
  constructor(props){
    super(props)

    this.state = { tracks:[] }//starts as an empty array until info comes from api  

    this.fetchTopTracks()//promise comes back and becomes json when resolved
    .then(json =>{this.setState({tracks:json.tracks.track})  //fetch api data & update state, and react will update automatically
    })
  }
  render() {
    // const tableData = Array(50).fill("Hello World!")
    //2 states - we don't have data and we do
    return (
      <View style={styles.container}>
        <FlatList //see documentation - need data property and renderItem function
          data={this.state.tracks}
          renderItem={({item})=> (
              <Cell cellItem={item}/>//see above component Cell, cellItem is prop available to view above
            )}
          keyExtractor={ (_, index) => index }
        />
      </View>
    );
  }
}
//flat list takes data as an array of objects, renderitem is a function that takes argument of item to display - what html should I encase the item in ?
const styles = StyleSheet.create({//how to style-- no hyphens,no spaces, use camelcase -called above in view
  container: {
    flex: 1,
    paddingTop:50,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: '#fff',
    flexDirection:'row'
  },
  cell:{
    flexDirection:'row',
    marginBottom:4
  },
  imageView:{
    height:75,
    width:75,
    backgroundColor:'gray'
  },
  contentView:{
    flex:1,
    backgroundColor:'cadetblue',
    justifyContent:'center'
  },
  accessoryView:{
    justifyContent:'center',
    width:40,
    backgroundColor:'cadetblue'
  },
  textCenter:{
    textAlign:'center'
  },
  textBold:{
    fontWeight:'bold'
  }
  // redBox:{
  //   flex:1, //siblings and percentages
  //   backgroundColor:'gray'
  // },
  // blueBox:{
  //   flex:1,
  //   backgroundColor:'cadetblue'
  // }
});
