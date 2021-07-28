import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../../res/Colors';
import Storage from '../../libs/storage';

class BadgesDetail extends React.Component {
  state = {
    badge: {},
    isFavorite: false,
  };

  //To start the action we call getBadge.

  componentDidMount() {
    this.getBadge();
  }

  //We get the badge info

  getBadge = () => {
    const {item} = this.props.route.params;
    //we send the item(contains the badge's data) to the badge in the state
    this.setState({badge: item}, () => {
      //we call to getFavorite  to know in  which way show the heart
      this.getFavorite();
    });
    //we show the name in the upper part of the screen
    this.props.navigation.setOptions({title: item.name});
  };

//getFavorite gets the id of the badge

  getFavorite = async () => {
    try {
      //we get the id from the badge info that is in badge state
      const key = `favorite-${this.state.badge._id}`;
      //We get the key from the storage
      const favoriteStr = await Storage.instance.get(key);
      //if the data is not null we set the state to true
      if (favoriteStr != null) {
        this.setState({isFavorite: true});
      }
    } catch (err) {
      console.log('Get favorite err', err);
    }
  };

// we defined the state by using the heart button

  toggleFavorite = () => {
    //depending of the state (true or false) we add or remove the badge to favorites
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  };

//addFavorite adds a user to the favorite section

  addFavorite = async () => {
    //we get the badge data that is saved in the badge state
    const badge = JSON.stringify(this.state.badge);
    //we save the user's id that we get from de db
    const key = `favorite-${this.state.badge._id}`;
    //We save the id and the badge so the badge will appear in the favorite section
    const stored = await Storage.instance.store(key, badge);
    //finally, if the badge is stored we change the state to true because it is a favorite now
    if (stored) {
      this.setState({isFavorite: true});
    }
  };

//  Next event deletes a user from favorite section 

  removeFavorite = async () => {
    //First we save the user's id that we get from de db
    const key = `favorite-${this.state.badge._id}`;
    //Using "remove" we delete that user with the id we previously got
    await Storage.instance.remove(key);
    //finally we change the state to false because it is not a favorite anymore
    this.setState({isFavorite: false});
  };

  render() {
    const {badge, isFavorite} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.badge}>
          <Image
            style={styles.header}
            source={{uri: `${badge.header_img_url}`}}
          />
          <Image
            style={styles.profileImage}
            source={{uri: `${badge.profile_picture_url}`}}
          />
          <TouchableOpacity
            style={styles.favorite}
            onPress={this.toggleFavorite}>
            <Image
              source={
                isFavorite
                  ? require('../../assets/isFavorite.png')
                  : require('../../assets/notFavorite.png')
              }
            />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{badge.name}</Text>
            <Text style={styles.age}>{badge.age}</Text>
          </View>
          <Text style={styles.city}>{badge.city}</Text>
          <View style={styles.data}>
            <View style={styles.dataColumns}>
              <Text style={styles.dataInfo}>{badge.followers || '0'} </Text>
              <Text style={styles.smallText}>Followers</Text>
            </View>
            <View style={styles.dataColumns}>
              <Text style={styles.dataInfo}>{badge.likes || '0'} </Text>
              <Text style={styles.smallText}>Likes</Text>
            </View>
            <View style={styles.dataColumns}>
              <Text style={styles.dataInfo}>{badge.posts || '0'} </Text>
              <Text style={styles.smallText}>Posts</Text>
            </View>
          </View>
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

  favorite: {
    position: 'absolute',
    top: 425,
    right: 40,
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
  data: {
    padding: 20,
    marginTop: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Colors.zirccon,
  },
  dataColumns: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataInfo: {
    marginTop: '5%',
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 25,
    color: Colors.charade,
  },
  smallText: {
    color: Colors.zirccon,
  },
});

export default BadgesDetail;
