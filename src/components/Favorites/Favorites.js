import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Colors from '../../res/Colors';
import Storage from '../../libs/storage';
import BadgesItem from '../BadgesScreen/BadgesItem';
import Loader from '../Generics/Loader';

class Favorites extends React.Component {
  state = {
    loading: false,
    badges: undefined,
  };

  //We get all the favorites

  componentDidMount = () => {
    this.getFavorites();
    this.focusEvent();
  };

  //getFavorites obtaines all the badges that must appear in favorites

  getFavorites = async () => {
    //we set loading true because it is supposed to be searching for all
    //the badges and the badges are undefined because we dont now the data yet.
    this.setState({loading:true, badges:undefined})
    try {
      //We save all the keys(ids)
      const allKeys = await Storage.instance.getAllKeys();
      // We get the favorite ids
      const keys = allKeys.filter(key => key.includes('favorite-'));
      //we save only the ids that are favorites
      const favs = await Storage.instance.multiGet(keys);
    //finally we save the favorites data
      const favorites = favs.map(fav => JSON.parse(fav[1]));
      //now the state of loading is going to be false and badges equals to favorites that contains all the data
      this.setState({loading: false, badges: favorites});
    } catch (err) {
      console.log('get favorites err', err);
    }
  };

  //to show the details of a favorite badge:

  handlePress = item => {
    this.props.navigation.navigate('FavoritesDetails', {item});
  };

  //To get all the favorites in its section:

  focusEvent = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getFavorites();
    });
  };

  //to start the action we call to focusListener in order to show all the favorite badges

  componentWillUnmount = () => {
    this.focusListener();
  };

  render() {
    const {badges, loading} = this.state;

    if (loading == true && !badges) {
      <Loader />;
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <FlatList
          style={styles.list}
          data={badges}
          renderItem={({item}) => (
            <BadgesItem item={item} onPress={() => this.handlePress(item)} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.charade,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loader: {
    height: '100%',
    alignSelf: 'center',
  },
  list: {
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default Favorites;
