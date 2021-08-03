import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Alert,
  StatusBar,
  FlatList,
} from 'react-native';
import Colors from '../../res/Colors';
import Http from '../../libs/http';
import Storage from '../../libs/storage';
import BadgesItem from './BadgesItem';
import BadgesSearch from './BadgesSearch';

class BadgesScreen extends React.Component {
  state = {
    loading: false,
    badges: undefined,
    badgesCopy: undefined,
  };
//next event calls to get the data (fetchdata) and also calls to the intervals
  componentDidMount() {
    this.fetchdata();
    this.focusEvent();
    this.blurEvent();
  }

  //next event clear the interval that was set before
  focusEvent = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.setFetchInterval();
    });
  };

//next event clear the interval that was set before
  blurEvent = () => {
    this.blurListener = this.props.navigation.addListener('blur', () => {
      clearInterval(this.interval);
    });
  };

  // setting an interval of 3s
  setFetchInterval = () => {
    this.interval = setInterval(this.fetchdata, 3000);
  };

  //next event get all the badges
  fetchdata = async () => {
    this.setState({loading: true});
    let response = await Http.instance.get_all();
    this.setState({loading: false, badges: response, badgesCopy: response});
  };

  //next event shows the user details
  handlePress = item => {
    //redirect the user to the badges details screen
    this.props.navigation.navigate('BadgesDetail', {item});
  };

  //next event is to edit a badge

  handleEdit = item => {
    //calls to BadgesEdit file
    this.props.navigation.navigate('BadgesEdit', {item});
  };

//handleChange change the badges

  handleChange = query => {
    //save the badges before changing them
    const {badgesCopy} = this.state;

//get the badges with the filter
    const badgesFiltered = badgesCopy.filter(badge => {
      return badge.name.toLowerCase().includes(query.toLowerCase());
    });

    //save the badges in the state
    this.setState({badges: badgesFiltered});

    //clean the interval
    if (query) {
      clearInterval(this.interval);
    } else {
      this.setFetchInterval();
    }
  };

//The next event deletes a badge

  handleDelete = item => {
    //we send a alert to say to the user if he is sure of deleting a badge
    Alert.alert(
      'Are you sure?',
      `Do you really want to delete ${item.name}'s badge?\n\nThis process canot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            this.setState({loading: true, badges: undefined});
            await Http.instance.remove(item._id);
            let key = `favorite-${item._id}`;
            await Storage.instance.remove(key);
            this.fetchdata();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

//this event calls to focusListener and to blurListener

  componentWillUnmount() {
    this.focusListener();
    this.blurListener();
  }

  render() {
    const {badges, loading} = this.state;

    if (loading === true && !badges) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator
            style={styles.loader}
            color="#43FF0D"
            size="large"
          />
        </View>
      );
    }

    return (
      <View style={[styles.container, styles.horizontal]}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <BadgesSearch onChange={this.handleChange} />
        <FlatList
          style={styles.list}
          data={badges}
          renderItem={({item}) => (
            <BadgesItem
              key={item._id}
              item={item}
              onPress={() => this.handlePress(item)}
              onEdit={() => this.handleEdit(item)}
              onDelete={() => this.handleDelete(item)}
            />
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
  },
  horizontal: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loader: {
    height: '100%',
    paddingHorizontal: 10,
  },
  list: {
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default BadgesScreen;
