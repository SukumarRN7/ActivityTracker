import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import AddActivityScreen from '../screens/AddActivity';
import SelectCalendarScreen from '../screens/Calendar';
import {RouteNames} from './screenHelper';

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RouteNames.HOME}>
        <Stack.Screen name={RouteNames.HOME} component={HomeScreen} />
        <Stack.Screen
          name={RouteNames.ADD_ACTIVITY}
          component={AddActivityScreen}
        />
        <Stack.Screen
          name={RouteNames.CALENDAR}
          component={SelectCalendarScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
