import React from 'react';
import Colors from '../../res/Colors';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Loader from '../Generics/Loader';
import UserSession from '../../libs/sessions';

const Background = {
  uri: `https://images.pexels.com/photos/7091640/pexels-photo-7091640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
};

class Signup extends React.Component {
  state = {
    loading: false,
    errors: [],
    user: undefined,
    isPasswordVisible: true,
    isPasswordConfVisible: true,
    form: {},
  };

  handleSubmit = async () => {
    try {
      this.setState({loading: true, user: undefined});
      let response = await UserSession.instance.signup(this.state.form);
      
      if (typeof response == 'object') {
        let errors = [];
        let cont = 0;

        for (let error in response) {
          let key = error;
          if (error == 'non_field_errors') {
            error = 'password';
          }

          errors.push(
            <View key={cont}>
              <Text>{`${error} : ${response[key][0]}`}</Text>
            </View>,
          );
          cont++;
        }
        this.setState({loading: false, user: undefined, errors: errors});
      } else {
        this.setState({
          loading: false,
          users: response,
          errors: [],
        });
        if (this.state.user) {
          this.props.navigation.navigate('Login');
        }
      }
    } catch (err) {
      console.log('Sign up err', err);
      throw Error(err);
    }
  };

  ToggleisPasswordVisible = () => {
    if (this.state.isPasswordVisible) {
      this.setState({isPasswordVisible: false});
    } else {
      this.setState({isPasswordVisible: true});
    }
  };

  ToggleisPasswordConfVisible = () => {
    if (this.state.isPasswordConfVisible) {
      this.setState({isPasswordConfVisible: false});
    } else {
      this.setState({isPasswordConfVisible: true});
    }
  };

  render() {
    const {isPasswordVisible, loading, user, errors, isPasswordConfVisible} =
      this.state;
    if (loading == true) {
      return <Loader />;
    }

    return (
      <ScrollView>
        <View style={styles2.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <ImageBackground source={Background} style={styles2.image}>
            <View style={styles2.layerColor}>
              <View style={styles2.errorForm}>
                <Text style={styles2.title}>Signup</Text>
                {errors ? <View style={styles2.error}>{errors}</View> : null}

              </View>

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
                    style={styles2.form}
                    placeholder="Email"
                    placeholderTextColor={Colors.charade}
                    onChangeText={text => {
                      this.setState(prevState => {
                        let form = Object.assign({}, prevState.form);
                        form.email = text;
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
                  <TouchableOpacity onPress={this.ToggleisPasswordVisible}>
                    <Image
                      style={{
                        marginLeft: 130,
                        marginTop: -60,
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
                  <TextInput
                    secureTextEntry={isPasswordConfVisible}
                    style={styles2.form}
                    placeholder="Password conf"
                    placeholderTextColor={Colors.charade}
                    onChangeText={text => {
                      this.setState(prevState => {
                        let form = Object.assign({}, prevState.form);
                        form.password_confirmation = text;
                        return {form};
                      });
                    }}
                  />
                  <TouchableOpacity onPress={this.ToggleisPasswordConfVisible}>
                    <Image
                      style={{
                        marginLeft: 130,
                        marginTop: -60,
                        width: 15,
                        height: 10,
                      }}
                      source={
                        isPasswordConfVisible
                          ? require('../../assets/no-ver.png')
                          : require('../../assets/visibility.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles2.buttonDark}
                    onPress={this.handleSubmit}>
                    <Text style={styles2.buttonDarkText}>Signup</Text>
                  </TouchableOpacity>
                </View>
              </View>
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

    height: 380,
    marginTop: 5,
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
  error:{
    marginBottom:20,
    color: Colors.white,
    
    fontSize: 12,
    textAlign: 'center'
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

  buttonDark: {
    width: 193,
    padding: 15,
    marginTop: 350,
    marginLeft: -20,
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

/* class Signup extends React.Component {
  state = {
    loading: false,
    errors: [],
    user: undefined,
    isPasswordVisible: true,
    isPasswordConfVisible: true,
    form: {},
  };

  handleSubmit = async () => {
    try {
      this.setState({loading: true, user: undefined});
      let response = await UserSession.instance.signup(this.state.form);
      if (typeof response == 'object') {
        var errors = [];
        let cont = 0;

        for (let error in response) {
          let key = error;
          if (error === 'non_field_errors') {
            error = 'password';
          }

          errors.push(
            <View key={cont}>
              <Text>{`Error ${error} : ${response[key][0]}`}</Text>
            </View>,
          );
          cont++;
        }
        this.setState({loading: false, user: undefined, errors: errors});
      } else {
        this.setState({
          loading: false,
          users: response,
          errors: [],
        });
        if (this.state.user) {
          this.props.navigation.navigate('Login');
        }
      }
    } catch (err) {
      console.log('Sign up err', err);
      throw Error(err);
    }
  };

  ToggleisPasswordVisible = () => {
    if (this.state.isPasswordVisible) {
      this.setState({isPasswordVisible: false});
    } else {
      this.setState({isPasswordVisible: true});
    }
  };

  ToggleisPasswordConfVisible = () => {
    if (this.state.isPasswordConfisible) {
      this.setState({isPasswordConfisible: false});
    } else {
      this.setState({isPasswordConfisible: true});
    }
  };

  render() {
    const {isPasswordVisible, loading, user, errors} = this.state;
    return (
      <ScrollView>
        <View style={styles2.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <ImageBackground source={Background} style={styles2.Image}>
            <View style={styles2.formShadow}>
              <View style={styles2.inputContainer}>
                <Text style={styles2.title}>Sign up</Text>
                {errors ? <View>{errors}</View> : null}
                <TextInput
                  style={styles2.form}
                  placeholder={"Username"}
                  placeholderTextColor={Colors.black}
                  onChangeText={text => {
                    this.setState(prevState => {
                      let form = Object.assign({}, prevState.form);
                      form.username = text;
                      return {form};
                    });
                  }}
                />
                <TextInput
                  style={styles2.form}
                  placeholder={"Email"}
                  keyboardType="email-address"
                  placeholderTextColor={Colors.black}
                  onChangeText={text => {
                    this.setState(prevState => {
                      let form = Object.assign({}, prevState.form);
                      form.email = text;
                      return {form};
                    });
                  }}
                />
                <TextInput
                  style={styles2.form}
                  placeholder={"Password"}
                  placeholderTextColor={Colors.black}
                  onChangeText={text => {
                    this.setState(prevState => {
                      let form = Object.assign({}, prevState.form);
                      form.password = text;
                      return {form};
                    });
                  }}
                />
                <TouchableOpacity onPress={this.ToggleisPasswordVisible}>
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
                <TextInput
                  style={styles2.form}
                  placeholder={"Confirm Password"}
                  placeholderTextColor={Colors.black}
                  onChangeText={text => {
                    this.setState(prevState => {
                      let form = Object.assign({}, prevState.form);
                      form.passwordConfirmation = text;
                      return {form};
                    });
                  }}
                />
              </View>
              <View >
                <TouchableOpacity
                  style={styles2.buttonDark}
                  onPress={this.handleSubmit}>
                  <Text style={styles2.buttonDarkText}>SINGUP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: Colors.zircon,
    paddingTop: '32%',
    paddingBottom: '40%',
  },

  title: {
    marginTop: '-25%',
    marginBottom: '10%',
    alignSelf: 'center',
    color: Colors.charade,
    fontWeight: 'bold',
  },
  Image: {
    width: '100%',
  },

  formShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 5,
    },

    height: 480,
    marginTop: -30,
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    backgroundColor: Colors.white,
    width: 261,
    height: '108%',
    borderRadius: 15,
    alignSelf: 'center',
  },

  inputContainer: {
    paddingTop: 130,
    alignSelf: 'center',
  },

  form: {
    paddingHorizontal: 20,
    color: Colors.black,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    marginBottom: 30,
    width: 150,
    textAlign: 'center',
    alignSelf: 'center',
  },

  buttonDark: {
    width: 193,
    padding: 15,
    marginTop: 597,
    borderRadius: 15,
    backgroundColor: Colors.blackPearl,
    borderColor: Colors.blackPearl,
    borderWidth: 1,
    alignSelf: 'center',
    zIndex: 2,
    position: 'absolute',
  },

  buttonDarkText: {
    textAlign: 'center',
    paddingHorizontal: 25,
    color: Colors.white,
  },
}); */

export default Signup;
