import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableHighlight,
  ImageBackground,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { setSeed } from '../actions/iotaActions';
import { randomBytes } from 'react-native-randombytes'


const { height, width } = Dimensions.get('window');

{ /* import sjcl from "sjcl";

const randArray = length => {
  return sjcl.random.randomWords(length, 10);
}; */ }

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class NewSeedSetup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(this.randomiseSeed()),
    };
  }

  randomiseSeed() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
    const seedArray = [];
    { /*  var values = randArray(81);
      for (i = 0; i < length; i++) {
       seedArray.push(charset[Math.abs(values[i]) % charset.length]);
    } */ }
    for (let i = 0; i < 81; i++) {
      seedArray.push(charset.charAt(Math.floor(Math.random() * charset.length)));
    }
    this.setSeed(seedArray);
    return seedArray;
  }

  setSeed(seedArray) {
    const seed = seedArray.join('');
    this.props.setSeed(seed);
  }

  generateSeed() {
    this.setState({
      dataSource: ds.cloneWithRows(this.randomiseSeed()),
    });


    // synchronous API
    // uses SJCL
    var rand = randomBytes(4)

    // asynchronous API
    // uses iOS-side SecRandomCopyBytes
    randomBytes(10, (err, bytes) => {
      console.log(bytes)
    })
  }

  onNextClick() {
    this.props.navigator.push({
      screen: 'saveYourSeed',
      navigatorStyle: { navBarHidden: true, screenBackgroundImageName: 'bg-green.png' },
      animated: false,
    });
  }

  onBackClick() {
    this.props.navigator.pop({
      animated: false,
    });
  }

  onItemClick(sectionID) {
    let seedArray = [];
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
    seedArray = this.state.dataSource;
    seedArray._dataBlob.s1[sectionID] = charset.charAt(Math.floor(Math.random() * charset.length));
    this.setState({
      dataSource: ds.cloneWithRows(seedArray._dataBlob.s1),
    });
    const seed = seedArray._dataBlob.s1.join('');
    this.props.setSeed(seed);
  }

  render() {
    return (
      <ImageBackground source={require('../images/bg-green.png')} style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={require('../images/iota-glow.png')} style={styles.iotaLogo} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
                                GENERATE A NEW SEED
                           </Text>
          </View>
          <TouchableOpacity onPress={event => this.generateSeed()} style={{ paddingBottom: height / 50 }}>
            <View style={styles.generateButton} >
              <Image style={styles.generateImage} source={require('../images/plus.png')} />
              <Text style={styles.generateText}>GENERATE NEW SEED</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.infoText}>
                          Press individual letters to randomise them.
                       </Text>
        </View>
        <View style={{ flex: 4.2, paddingTop: height / 40 }}>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData, rowID, sectionID) =>
                             (<TouchableHighlight style={{ padding: 5 }} key={sectionID} onPress={event => this.onItemClick(sectionID)} underlayColor="#F7D002">
                               <Text style={styles.item}>{rowData}</Text>
                             </TouchableHighlight>)
                            }
            style={{ flex: 1, height: width / 1.1 , width: width / 1.1 }}
            initialListSize={81}
            scrollEnabled={false}
          />
        </View>
        <View style={{ width: width / 1.5, flex: 1.5}}>
          <Text style={styles.infoText}>
                         Seeds are 81 characters long, and contain capital letters A-Z, or the number 9.
                      </Text>
          <Text style={styles.warningText}>
                         NEVER SHARE YOUR SEED WITH ANYONE
                      </Text>
          <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{ paddingRight: width / 16 }}>
              <TouchableHighlight onPress={event => this.onBackClick()}>
                <View style={styles.backButton} >
                  <Text style={styles.backText}>GO BACK</Text>
                </View>
              </TouchableHighlight>
            </View>
            <TouchableHighlight onPress={event => this.onNextClick()}>
              <View style={styles.nextButton} >
                <Text style={styles.nextText}>NEXT</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#102e36',
  },
  topContainer: {
    flex: 2.3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height / 30,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: 'white',
    width: width / 14,
    height: width / 14,
    color: '#1F4A54',
    fontFamily: 'Lato-Bold',
    fontSize: width / 28.9,
    textAlign: 'center',
    paddingTop: 4,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width / 7,
    paddingTop: height / 35,
    paddingBottom: height / 30,
  },
  title: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: width / 20.25,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  infoText: {
    color: 'white',
    fontFamily: 'Lato-Light',
    fontSize: width / 33.75,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  warningText: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: width / 33.75,
    textAlign: 'center',
    paddingTop: 7,
    backgroundColor: 'transparent',
  },
  generateButton: {
    flexDirection: 'row',
    borderColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1.5,
    borderRadius: 8,
    width: width / 2.5,
    height: height / 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#009f3f',
  },
  generateText: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: width / 40.5,
    backgroundColor: 'transparent',
    paddingRight: 10,
  },
  nextButton: {
    borderColor: '#9DFFAF',
    borderWidth: 1.5,
    borderRadius: 10,
    width: width / 3,
    height: height / 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  nextText: {
    color: '#9DFFAF',
    fontFamily: 'Lato-Light',
    fontSize: width / 25.3,
    backgroundColor: 'transparent',
  },
  backButton: {
    borderColor: '#F7D002',
    borderWidth: 1.5,
    borderRadius: 10,
    width: width / 3,
    height: height / 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  backText: {
    color: '#F7D002',
    fontFamily: 'Lato-Light',
    fontSize: width / 25.3,
    backgroundColor: 'transparent',
  },
  generateImage: {
    height: width / 30,
    width: width / 30,
  },
  iotaLogo: {
    height: width / 6,
    width: width / 6,
  },

});

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  setSeed: (seed) => {
    dispatch(setSeed(seed));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSeedSetup);
