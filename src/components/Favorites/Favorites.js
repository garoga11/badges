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

  componentDidMount = () => {
    this.getFavorites();
    this.focusEvent();
  };

  getFavorites = async () => {
    this.setState({loading:true, badges:undefined})
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter(key => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map(fav => JSON.parse(fav[1]));
      this.setState({loading: false, badges: favorites});
    } catch (err) {
      console.log('get favorites err', err);
    }
  };

  handlePress = item => {
    this.props.navigation.navigate('FavoritesDetails', {item});
  };

  focusEvent = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getFavorites();
    });
  };

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
