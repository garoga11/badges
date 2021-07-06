import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Colors from '../res/Colors';

class BadgesItem extends React.Component {
  render() {
    const {item} = this.props;
    return (
      <View style={styles2.container}>
        <TouchableOpacity onPress={this.props.onPress}> 
          <View style={styles2.row}>
            <Image
              style={styles2.profile}
              source={{uri: `${item.profile_picture_url}`}}
            />
            <View style={styles2.userData}>
              <Text style={styles2.nameText}>{item.name}</Text>
              <Text style={styles2.cityText}>{item.city}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles2.icons}>
          <Pressable onPress={this.props.onEdit}>
            <Image
              style={styles2.editIcon}
              source={require('../../assets/editar.png')}
            />
          </Pressable>
          <Pressable onPress={this.props.onDelete}>
            <Image
              style={styles2.deleteIcon}
              source={require('../../assets/delete.png')}
            />
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zirccon,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  profile: {
    width: 55,
    height: 55,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: Colors.white,
  },
  cityText: {
    fontWeight: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: Colors.white,
  },
  icons:{
      flex:1,
      alignItems:'center',
      justifyContent: 'flex-end',
      flexDirection: 'row'
  },
  editIcon:{
      height:22,
      width:22,
      resizeMode: 'cover',
      justifyContent: 'center'
  },
  deleteIcon:{
      marginLeft:15,
      height:22,
      width:22,
      resizeMode: 'cover',
      justifyContent: 'center'
  }
});

export default BadgesItem;
