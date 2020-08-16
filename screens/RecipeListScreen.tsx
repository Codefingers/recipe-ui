import * as React from 'react';
import ServiceContext, {ServiceContextData} from "../services/ServiceContext";
import List from "../components/Recipe/List";
import { useFocusEffect } from '@react-navigation/native';

/**
 * The recipe list screen for displaying recipes
 */
export default function RecipeListScreen({ route, navigation }) {
    const [newOrUpdatedRecipe, setNewRecipe] = React.useState(undefined);

    useFocusEffect(
        React.useCallback(() => {
            setNewRecipe(route.params?.recipe);

            return;
        }, [route.params?.recipe])
    );

    return (
        <ServiceContext.Consumer>
            {(serviceContextData: ServiceContextData ): React.ReactElement => (
                <List service={serviceContextData.recipeService} navigation={navigation} newOrUpdatedRecipe={newOrUpdatedRecipe} />
            )}
        </ServiceContext.Consumer>
    );
}
