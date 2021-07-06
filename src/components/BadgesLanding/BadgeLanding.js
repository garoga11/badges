import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Colors from '../res/Colors';

const imageBackground = {
  uri: 'https://images.pexels.com/photos/4337031/pexels-photo-4337031.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
};

class BadgeLanding extends React.Component {
 handlePress = () => {
    this.props.navigation.replace('Badges');
  };
  

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <ImageBackground source={imageBackground} style={styles.image}>
          <View style={styles.layerColor}>
            <Text style={styles.title}>
              Welcome {'\n'} to my {'\n'} app
            </Text>
            <TouchableOpacity style={styles.button} onPress={this.handlePress}>
              <Text style={styles.buttonText}>Welcome</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  layerColor: {
    flex: 2,
    backgroundColor: '#04593A80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    margin: 30,
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    marginTop: 50,
    borderRadius: 15,
    backgroundColor: '#121212cc',
    borderColor: Colors.white,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 25,
    color: Colors.white,
  },
});

export default BadgeLanding;
