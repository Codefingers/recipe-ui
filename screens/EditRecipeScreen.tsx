import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import {RootStackParamList} from "../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import Edit from "../components/Recipe/Edit";

type EditRecipeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'EditRecipe'
    >;

type EditRecipeScreenRouteProp = RouteProp<RootStackParamList, 'EditRecipe'>;

export type EditRecipeScreenProps = {
  navigation: EditRecipeScreenNavigationProp;
  route: EditRecipeScreenRouteProp;
};

export default function EditRecipeScreen({ route, navigation }: EditRecipeScreenProps) {
  const recipe = route.params.recipe;

  return (
    <View style={styles.container}>
      <Edit recipe={recipe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4ECD6',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    color: 'black',
  },
});

