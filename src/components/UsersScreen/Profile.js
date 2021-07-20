import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileEdit from './ProfileEdit';
import Colors from '../../res/Colors';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

class Profile extends React.Component{
    render() {
        return(
            <ScrollView style= {styles.scrollView}>
                <View style= {styles.container}>
                    <Text>Profile</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView:{
        flex:1,
    },
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent: 'center',
        backgroundColor: Colors.charade,
        width:'100%'
    }
})

export default Profile;