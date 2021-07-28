import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Colors from '../../res/Colors';

class BadgesSearch extends React.Component {
  state = {
    query: '',
  };

  //We send the text on the search bar

  handleText = query => {
    //we save the text we are going to search for in query
    this.setState({query});
    //if the text changed we send the text to the query again
    if (this.props.onChange) {
      this.props.onChange(query);
    }
  };

  render() {

    const {query} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.TextInput}
          onChangeText={this.handleText}
          value={query}
          placeholder="Search a badge"
          placeholderTextColor={Colors.charade}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        width:'95%',
        marginTop:20,
        color: Colors.white
    },
    TextInput:{
        borderColor: Colors.blackPearl,
        borderWidth:1,
        borderRadius: 10,
        paddingHorizontal:16,
        backgroundColor: Colors.white,
        color: Colors.charade,
    }
});

export default BadgesSearch;
