import React, { Component } from 'react';
import { Button, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';


const HeaderOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff"
    }
};

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
            />
        </HomeNavigator.Navigator>
    );
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
    return(
        <MainNavigator.Navigator
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor: "#D1C4E9"
            }}
        >
            <MainNavigator.Screen name="Home" component={HomeNavigatorScreen} />
            <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen} />
        </MainNavigator.Navigator>
    );
}

class Main extends Component {

  render() {
 
    return (
        <NavigationContainer>
            <MainNavigatorDrawer/>           
        </NavigationContainer>
    );
  }
}
  
export default Main;