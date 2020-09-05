import * as React from 'react';
import {RootStackParamList} from "../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import ServiceContext, {ServiceContextData} from "../services/ServiceContext";
import Form from "../components/Recipe/Common/Form";

type CreateRecipeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateRecipe'>;

type CreateRecipeScreenRouteProp = RouteProp<RootStackParamList, 'CreateRecipe'>;

export type CreateRecipeScreenProps = {
    navigation: CreateRecipeScreenNavigationProp;
    route: CreateRecipeScreenRouteProp;
};

export default function CreateRecipeScreen({route, navigation}: CreateRecipeScreenProps) {
    return (
        <ServiceContext.Consumer>
            {(serviceContextData: ServiceContextData): React.ReactElement => (
                <Form service={serviceContextData.recipeService} navigation={navigation}/>
            )}
        </ServiceContext.Consumer>
    );
}
