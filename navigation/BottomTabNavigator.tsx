import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import RecipeListScreen from '../screens/RecipeListScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { BottomTabParamList, RecipeListTabParamList, ExploreTabParamList } from '../types';
import AddRecipeButton from "./common/header/AddRecipeButton";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="RecipeListTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="RecipeListTab"
        component={RecipeListTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="food" size={24} color={color} />,
          tabBarLabel: 'Recipes'
        }}
      />
      <BottomTab.Screen
        name="ExploreTab"
        component={ExploreTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-search" size={24} color={color} />,
            tabBarLabel: 'Explore',
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const RecipeListTabStack = createStackNavigator<RecipeListTabParamList>();

function RecipeListTabNavigator() {
  return (
    <RecipeListTabStack.Navigator>
      <RecipeListTabStack.Screen
        name="RecipeListScreen"
        component={RecipeListScreen}
        options={
            {
                headerTitle: 'Recipes',
                headerRight: () => <AddRecipeButton />
            }
        }
      />
    </RecipeListTabStack.Navigator>
  );
}

const ExploreTabStack = createStackNavigator<ExploreTabParamList>();

function ExploreTabNavigator() {
  return (
    <ExploreTabStack.Navigator>
      <ExploreTabStack.Screen
        name="RecipeExploreScreen"
        component={ExploreScreen}
        options={
            {
                headerTitle: 'Explore',
            }
        }
      />
    </ExploreTabStack.Navigator>
  );
}
