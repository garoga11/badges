import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import BadgesStack from './BadgesStack';
import Colors from '../res/Colors';
import Color from 'color';

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
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={require('../../assets/home.png')}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Badges1"
        component={BadgesStack}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={require('../../assets/home.png')}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Badges2"
        component={BadgesStack}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={require('../../assets/home.png')}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BadgesTabNavigator;
