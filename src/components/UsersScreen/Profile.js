import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileEdit from './ProfileEdit';
import Colors from '../../res/Colors';
import {ScrollView, Text, StyleSheet, View, Image} from 'react-native';
import UserSession from '../../libs/sessions';

const Icon = {
  uri: `https://image.flaticon.com/icons/png/512/711/711191.png`,
};


class Profile extends React.Component {
  state = {
    user: {
      profile:{},
    },
    token: {},
  };

  componentDidMount = () => {
    this.getUserData();
  };

  getUserData = async () => {
    let user = await UserSession.instance.getUser();
    console.log(user.username)
    let token = await UserSession.instance.getToken(user.username);
    this.setState({user: user, token: token});
    console.log(this.state);
  };

  render() {
    const {user} = this.state;
    return (
      
        <View style={styles.container}>
            <View style={styles.badge}>
              <Image
                style={styles.header}
                source={{uri: `${user.profile.header_img}`}}
              />
              <Image
                style={styles.profileImage}
                source={{uri: `${user.profile.profile_picture}`}}
              />
              <Image style={styles.icon} source={Icon} />
              

              <View style={styles.userInfo}>
                <Text style={styles.name}>{user.first_name}</Text>
                <Text style={styles.lastname}>{user.last_name}</Text>
                <Text style={styles.age}>{user.profile.age}</Text>
              </View>
              <Text style={styles.city}>{user.profile.city}</Text>
              <Text style={styles.city}>{user.profile.country}</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  icon:{
    width: 150,
  },
  badge: {
    flex: 1,
    margin: 20,
    marginTop: 45,
    width: '90%',
    height: '90%',
    backgroundColor: Colors.white,
    borderRadius: 25,
  },
  header: {
    width: '100%',
    height: '40%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  profileImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: Colors.white,
    position: 'absolute',
    top: 170,
    left: '21%',
  },

  userInfo: {
    flexDirection: 'row',
    marginTop: 140,
    justifyContent: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.blackPearl,
  },
  lastname:{
    marginLeft:8,
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.blackPearl,
  },
  age: {
    fontSize: 28,
    marginLeft: 20,
    color: Colors.zirccon,
  },
  city: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.zirccon,
  },
 
});

export default Profile;
