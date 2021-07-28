import React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import Colors from '../../res/Colors';
import UserSession from '../../libs/sessions';
import Loader from '../Generics/Loader';

const Background = {
  uri: `https://images.pexels.com/photos/7091640/pexels-photo-7091640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
};

class Login extends React.Component {
  state = {
    loading: false,
    error: null,
    user: undefined,
    isPasswordVisible: true,
    form: {},
  };

  //handleSubmit sends the data to the db to verify if everything is correct, if yes, 
  //the user will be redirected to home, otherwise, the user will see the error in the screen

  handleSubmit = async () => {
    try {
      //we set the loading true because wee are consulting the db, we don't have erros yet and the user is undefined.
      this.setState({loading: true, error: null, user: undefined});
      //We send the data of the user to verify it
      let response = await UserSession.instance.login(this.state.form);

      //if we get an object as response we show the error
      if (typeof response == 'object') {
        console.log(response)
        if (response['405']) {
         var message = 'Your account is not verified';
        }else {
          var message = 'Invalid username or password, try again';
        }
        this.setState({loading: false, error: message, user: undefined});
      } else {
        //If the response is not an object we got the user
        this.setState({loading: false, error: null, user: response});
      }
    } catch (err) {
      this.setState({loading: false, error: err});
    }
    //we send the userr to home
    if (this.state.user) {
      this.props.navigation.replace('BadgesTabNavigator');
    }
  };

  //We show the password depending if the user click on the eye image

    toggleisPasswordVisible = () => {
    if (this.state.isPasswordVisible) {
      this.setState({isPasswordVisible: false});
    } else {
      this.setState({isPasswordVisible: true});
    }
  };

  //We redirect to the user to signup screen

  handleSignup = () => {
    this.props.navigation.navigate('Signup');
  };

  render() {
    const {isPasswordVisible, loading, error, user} = this.state;
    if (loading === true && !user) {
      return <Loader />;
    }
    return (
      <ScrollView>
        <View style={styles2.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <ImageBackground source={Background} style={styles2.image}>
            <View style={styles2.layerColor}>
              <Text style={styles2.title}>Welcome</Text>
              {error ? (
                <View>
                  <Text>
                    {error}
                  </Text>
                </View>
              ) : null}
              <View style={styles2.login}>
                <View style={styles2.inputContainer}>
                  <TextInput
                    style={styles2.form}
                    placeholder="Username"
                    placeholderTextColor={Colors.charade}
                    onChangeText={text => {
                      this.setState(prevState => {
                        let form = Object.assign({}, prevState.form);
                        form.username = text;
                        return {form};
                      });
                    }}
                  />
                  <TextInput
                    secureTextEntry={isPasswordVisible}
                    style={styles2.form}
                    placeholder="Password"
                    placeholderTextColor={Colors.charade}
                    onChangeText={text => {
                      this.setState(prevState => {
                        let form = Object.assign({}, prevState.form);
                        form.password = text;
                        return {form};
                      });
                    }}
                  />
                </View>
                <TouchableOpacity onPress={this.  toggleisPasswordVisible}>
                  <Image
                    style={{
                      marginLeft: 130,
                      marginTop: -30,
                      width: 15,
                      height: 10,
                    }}
                    source={
                      isPasswordVisible
                        ? require('../../assets/no-ver.png')
                        : require('../../assets/visibility.png')
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles2.buttonDark}
                  onPress={this.handleSubmit}>
                  <Text style={styles2.buttonDarkText}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles2.signup}>
              <Text style={styles2.signupText}>Don't have an account?</Text>
              <TouchableOpacity
                style={styles2.buttonLight}
                onPress={this.handleSignup}>
                <Text style={styles2.buttonLightText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: -80,
    paddingTop: 250,
    paddingBottom: 130,
    marginBottom: -1,
  },

  logoContainer: {
    alignSelf: 'center',
    marginTop: -100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.0,
    elevation: 20,

    backgroundColor: Colors.white,

    width: 110,
    height: 110,
    resizeMode: 'cover',
    borderRadius: 90,
    position: 'absolute',

    zIndex: 2,
  },

  logo: {
    width: 145,
    height: 105,
    justifyContent: 'center',
    alignSelf: 'center',

    zIndex: 2,
  },

  layerColor: {
    flex: 2,

    justifyContent: 'center',

    alignItems: 'center',
  },

  title: {
    marginBottom: 120,
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.white,

    color: Colors.white,
  },

  login: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },

    height: 250,
    marginTop: -30,
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    backgroundColor: Colors.white,
    width: 261,
    borderRadius: 15,
    display: 'flex',

    // justifyContent: 'center',

    alignItems: 'center',
    zIndex: 1,
    position: 'relative',
  },

  inputContainer: {
    paddingTop: 40,
    marginBottom: -30,
  },

  form: {
    paddingHorizontal: 20,
    color: Colors.charade,
    borderBottomColor: Colors.charade,
    borderBottomWidth: 1,
    marginBottom: 30,
    width: 150,
    textAlign: 'center',
  },

  signup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
  },

  signupText: {
    marginTop: 25,
    color: Colors.white,
    fontWeight: 'bold',
  },

  buttonLight: {
    width: 193,
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: Colors.charade,
    borderWidth: 2.5,
  },

  buttonLightText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 25,
    color: Colors.charade,
  },
  buttonDark: {
    width: 193,
    padding: 15,
    marginTop: 220,
    // marginBottom: 0,
    backgroundColor: Colors.charade,
    borderRadius: 15,
    borderColor: Colors.charade,
    borderWidth: 1,
    justifyContent: 'center',
    zIndex: 5,
    position: 'absolute',
  },

  buttonDarkText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 25,
    color: Colors.white,
  },
});

export default Login;
