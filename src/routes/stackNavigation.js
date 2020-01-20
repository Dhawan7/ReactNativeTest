import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Routes 
import Home from '../screen/home';

const StackNavigator = createStackNavigator({
    Home : Home
    });

export default createAppContainer(StackNavigator);