import * as React from 'react';
import ServiceContext, {ServiceContextData} from "../services/ServiceContext";
import List from "../components/Recipe/List";
import {View} from "../components/Themed";
import { useFocusEffect } from '@react-navigation/native';

/**
 * The recipe list screen for displaying recipes
 */
export default function RecipeListScreen({ route, navigation }) {
    const [newRecipe, setNewRecipe] = React.useState(undefined);

    useFocusEffect(
        React.useCallback(() => {
            setNewRecipe(route.params?.newRecipe);

            return;
        }, [route.params?.newRecipe])
    );

    return (
        <ServiceContext.Consumer>
            {(serviceContextData: ServiceContextData ): React.ReactElement => (
                <View>
                    <List service={serviceContextData.recipeService} navigation={navigation} newRecipe={newRecipe} />
                </View>
            )}
        </ServiceContext.Consumer>
    );
}
