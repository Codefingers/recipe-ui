import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {RootStackParamList} from "../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import Edit from "../components/Recipe/Edit";
import ServiceContext, {ServiceContextData} from "../services/ServiceContext";

type EditRecipeScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'EditRecipe'>;

type EditRecipeScreenRouteProp = RouteProp<RootStackParamList, 'EditRecipe'>;

export type EditRecipeScreenProps = {
    navigation: EditRecipeScreenNavigationProp;
    route: EditRecipeScreenRouteProp;
};

export default function EditRecipeScreen({route, navigation}: EditRecipeScreenProps) {
    const recipe = route.params?.recipe;

    return (
        <ServiceContext.Consumer>
            {(serviceContextData: ServiceContextData): React.ReactElement => (
                <Edit service={serviceContextData.recipeService} navigation={navigation} recipe={recipe}/>
            )}
        </ServiceContext.Consumer>
    );
}
