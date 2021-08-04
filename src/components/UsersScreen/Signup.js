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

  //handleSubmit sends the form info in order to verify it and get a response

  handleSubmit = async () => {
    try {
      //We set the userr as undefined and loading as true
      this.setState({loading: true, user: undefined});
      //We send the form to signup
      let response = await UserSession.instance.signup(this.state.form);
      
       //if we get an object as response we show the error
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
        //we save the errors in errors to show them
        this.setState({loading: false, user: undefined, errors: errors});
      } else {
        //if we did not have errors we save the user data
        this.setState({
          loading: false,
          user: response,
          errors: [],
        });
        //we send the user to login
        if (this.state.user) {
          this.props.navigation.navigate('Login');
        }
      }
    } catch (err) {
      console.log('Sign up err', err);
      throw Error(err);
    }
  };

  //We show the password depending if the user click on the eye image

  ToggleisPasswordVisible = () => {
    if (this.state.isPasswordVisible) {
      this.setState({isPasswordVisible: false});
    } else {
      this.setState({isPasswordVisible: true});
    }
  };

  //We show the password confirmation depending if the user click on the eye image

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
                {errors ? (<View style={styles2.error}>{errors}</View>  ): null}

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
                      style={styles2.password}
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
                      style={styles2.password}
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
  password:{
    //marginLeft: 130,
    //marginTop: -30,
    width: 15,
    height: 10,
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
    textAlign: 'center',
  },

  buttonDark: {
    width: 193,
    padding: 15,
    marginTop: 390,
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

export default Signup;