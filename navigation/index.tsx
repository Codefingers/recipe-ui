import {NavigationContainer, Theme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import EditRecipeScreen from "../screens/EditRecipeScreen";
import CreateRecipeScreen from "../screens/CreateRecipeScreen";
import {RootStackParamList} from "../types";

const Light: Theme = {
    dark: false,
    colors: {
        primary: '#A7CAB1',
        background: '#F4ECD6',
        card: 'black',
        text: 'white',
        border: 'black',
        notification: 'rgb(255, 69, 58)',
    },
};

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={Light}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();


function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} options={{ headerShown: true, headerTitle: 'Create Recipe'}} />
      <Stack.Screen name="EditRecipe" component={EditRecipeScreen} options={{ headerShown: true, headerTitle: 'Edit Recipe'}} />
    </Stack.Navigator>
  );
}
