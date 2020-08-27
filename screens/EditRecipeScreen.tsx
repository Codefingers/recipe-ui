import * as React from 'react';
import {RootStackParamList} from "../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import ServiceContext, {ServiceContextData} from "../services/ServiceContext";
import Form from "../components/Recipe/Common/Form";

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
                <Form service={serviceContextData.recipeService} navigation={navigation} recipe={recipe}/>
            )}
        </ServiceContext.Consumer>
    );
}
