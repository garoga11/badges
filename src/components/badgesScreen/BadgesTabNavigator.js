import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import BadgesStack from './BadgesStack';
import Colors from '../../res/Colors';
import FavoriteStack from '../Favorites/FavoritesStack';
import UserStack from '../UsersScreen/UserStack';

const Tabs = createMaterialTopTabNavigator();

const BadgesTabNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: true,
        tintColor: Colors.white,
        activeTintColor: '#43FF0D',
        style: {
          backgroundColor: Colors.zirccon,
          paddingTop:35,
        },
      }}>
      <Tabs.Screen
        name="Badges"
        component={BadgesStack}
      />

      <Tabs.Screen
        name="Favorites"
        component={FavoriteStack}
      />
      <Tabs.Screen
        name="Profile"
        component={UserStack}
      />

    </Tabs.Navigator>
  );
};

export default BadgesTabNavigator;
